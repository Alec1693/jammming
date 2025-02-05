import SearchBar from "./searchbar";
import Results from "./Results";
import React, { useState } from "react";

function App() {
  //state stores results from search via spotify api
  const [searchResults, setSearchResults] = useState([]);
  //state to store the playlist user is adding to
  const [playlist, setPlaylist] = useState([]);
  //callback function to retrieve the search results from SearchBar
  const storeSearchResults = (results) => {
    setSearchResults(results);
  }
  //callback function to add an item to playlist state for playlist component
  const addTrackToPlaylist = (track) => {
    //need a condition to check if songId exists in playlist state
    setPlaylist(prev => [...prev, track]);
    console.log("Track added")
  }
  //test function Im using to print some data to console
  const test = (t) => {
    console.log(t)
  }
  //3 react components needed for app: Searchbar, Results, Playlist
  //1 Module to process API requests: Spotify

  return (
    <div>
      <SearchBar storeSearch={storeSearchResults}/>
      <Results addTrack={addTrackToPlaylist} searchResults={searchResults} />
    </div>
  );
}

export default App;
