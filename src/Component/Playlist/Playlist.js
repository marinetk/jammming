import React from 'react';
import ReactDOM from 'react-dom';
import './Playlist.css'
import {TrackList} from '../TrackList/TrackList.js'

export class Playlist extends React.Component {


    render() {
        return (
          <div className = "Playlist" >
            <input
              defaultValue = {this.props.playlistName}
              onChange =  {this.props.onChange}
            />
            <TrackList
              tracks = {this.props.playlistTracks}
              isRemoval={true}
              onRemove={this.props.onRemove}
            />
            <a className = "Playlist-save" onClick={this.props.onSave} > SAVE TO SPOTIFY < /a>
          </div>
        )
    }
}
