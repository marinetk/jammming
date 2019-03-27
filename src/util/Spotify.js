const clientID = '0b4701b0aab34d33b8030274c70ad818';
const redirectURI = 'http://localhost:3000/';
const searchEndpoint = 'https://api.spotify.com/v1/';
const authEndpoint = 'https://accounts.spotify.com/authorize';

let accessToken;

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      console.log(accessToken)
      return accessToken;
    }
  const URLToken = window.location.href.match(/access_token=([^&]*)/);
    const tokenExpiration = window.location.href.match(/expires_in=([^&]*)/);
    if (URLToken && tokenExpiration) {
     accessToken = URLToken[1];
      const expires = Number(tokenExpiration[1]);
      window.setTimeout(()=> accessToken = '', expires * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log(accessToken)
      return accessToken;
    } else {
      const accessURL = `${authEndpoint}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
  search(term) {
    let accessToken = this.getAccessToken();
    return fetch(`${searchEndpoint}search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if(!jsonResponse.tracks){
        return [];
      }
        return jsonResponse.tracks.items.map( track => ({
          id: track.id,
          name : track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
      }))
    })
  },
  savePlaylist(name, trackURIs) {
      if (!name || !trackURIs.length) {
        return;
      }

      const accessToken = this.getAccessToken();
      let userID;

      return fetch('https://api.spotify.com/v1/me',
        {headers: {Authorization: `Bearer ${accessToken}` }}
        ).then(response => response.json()
        ).then(jsonResponse => {
          userID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            method: 'POST',
            body: JSON.stringify({name: name})
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
          });
        });
      });
    }
  };



export default Spotify;
