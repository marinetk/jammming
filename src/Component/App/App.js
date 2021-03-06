import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Playlist} from '../Playlist/Playlist.js'
import { SearchResults } from '../SearchResults/SearchResults.js'
import { SearchBar } from '../SearchBar/SearchBar.js'
import './App.css';
import Spotify from '../../util/Spotify.js'

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          searchResults: [],
          playlistName: 'My playlist',
          playlistTracks: []
          }
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.updatePlaylistName = this.updatePlaylistName.bind(this)
        this.savePlaylist = this.savePlaylist.bind(this)
        this.search = this.search.bind(this)
  }

    addTrack(track) {
      const tracks = this.state.playlistTracks;
        if (tracks.find(savedTrack => savedTrack.id === track.id)) {
          return;
      } else {
          let tracks = this.state.playlistTracks;
          tracks.push(track);
          this.setState({playlistTracks: tracks})
        }
    }

    removeTrack(track) {
        const playlistTracks = this.state.playlistTracks;
        const playlistTrackIndex = playlistTracks.findIndex(playlistTrack => {
          return track.id === playlistTrack.id
        });
          playlistTracks.splice(playlistTrackIndex, 1);
          this.setState({playlistTracks: playlistTracks})
      }


    search(searchTerm) {
          Spotify.search(searchTerm).then(searchTracks => {
          this.setState({searchResults : searchTracks});
        });
    }

    updatePlaylistName(e) {
        this.setState({playlistName: e.target.value})
    }

    savePlaylist(){
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs
          ).then(() => {
            this.setState({
              playlistName: "New Playlist",
              playlistTracks : []
            });
          });
    }
    render() {
        return (
          <div>
            <h1> Ja<span className="highlight">mmm</span>ing</h1>
            <div className = "App" >
              <SearchBar onSearch = {this.search} />
              <div className = "App-playlist" >
                <SearchResults
                  searchResults = {this.state.searchResults}
                  onAdd = {this.addTrack}
                />
                <Playlist
                  playlistName = {this.state.playlistName}
                  onChange = {this.updatePlaylistName}
                  onSave = {this.savePlaylist}
                  playlistTracks = {this.state.playlistTracks}
                  onRemove = {this.removeTrack}
                />
              </div >
            </div >
          </div>
      )
  }
}
