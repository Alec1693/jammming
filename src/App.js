import SearchBar from "./searchbar";
import Results from "./Results";
import React, { useState } from "react";
import Spotify from "./utils/Spotify";

function App() {
  //state stores results from search via spotify api
  const [searchResults, setSearchResults] = useState([]);
  //state to store the playlist user is adding to
  const [playlist, setPlaylist] = useState([]);
  //callback function to retrieve the search results from SearchBar
  const storeSearchResults = (results) => {
    setSearchResults(results);
  }
  //create a function thats used as a callback to searchbar and calls the spotify search method using the value of item being searched from searchbar.js
  async function spotifySearch(searchValue){
    //setSearchResults(Spotify.search(searchValue));
    const token = await Spotify.fetchAccessToken();
    console.log(token)
    const apiSearchResults = await Spotify.search(token, searchValue);
    console.log(apiSearchResults)
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
      <SearchBar sendSearch={spotifySearch} />
      <Results addTrack={addTrackToPlaylist} searchResults={searchResults} />
    </div>
  );
}

export default App;
