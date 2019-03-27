import React, { Component } from 'react';
import './SearchBar.css';

export class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {term : ''};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search () {
    if (this.state.term) {
      this.props.onSearch(this.state.term);
    }
  }

  handleTermChange (e) {
    this.setState({term: e.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange = {this.handleTermChange}/>
        <a onClick = {this.search}>SEARCH</a>
      </div>

    )
  }
}
