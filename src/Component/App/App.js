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
        const tracks = this.state.playlistTracks;
        if (tracks.find(savedTrack => savedTrack.id !== track.id)) {
            return;
        } else {
          const trackIndex = tracks.findIndex(track => {
            return savedTrack => savedTrack.id === track.id
          });
          tracks.splice(trackIndex, 1);
          this.setState({playlistTracks: tracks})
      }
    }

    search(searchTerm) {
          Spotify.search(searchTerm).then(searchTracks => {
          this.setState({searchResults : searchTracks});
        });
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name})
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
          <div >
            <h1 > Ja < span className = "highlight" > mmm < /span> ing</h1 >
            <div className = "App" >
              <SearchBar onSearch = {this.search} />
              <div className = "App-playlist" >
                <SearchResults
                  searchResults = {this.state.searchResults}
                  onAdd = {this.addTrack}
                />
                <Playlist
                  playlistName = {this.state.playlistName}
                  onNameChange = {this.updatePlaylist}
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
