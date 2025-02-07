import SearchBar from "./searchbar";
import Results from "./Results";
import React, { useState, useEffect } from "react";
import Spotify from "./utils/Spotify";
import Playlist from "./Playlist";

function App() {
  //state stores results from search via spotify api
  const [searchResults, setSearchResults] = useState([]);
  //state to store the playlist user is adding to
  const [playlist, setPlaylist] = useState([]);
  //create a useEffect that runs only when the app component mounts. I want to use oauth2 to authorize access to users account with permission to create a new playlist
  //useEffect will also retrieve an access_token returned via url and store it in a variable to be used when sending api request to create a playlist and add songs to playlist
  //callback function to retrieve the search results from SearchBar
  useEffect(() => {
    const authUrl = Spotify.getAuthorizationLink();
    window.location.href = authUrl;
    const code = Spotify.getCodeFromUrl();
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }, [])
  const storeSearchResults = (results) => {
    setSearchResults(results);
  }
  //create a function thats used as a callback to searchbar and calls the spotify search method using the value of item being searched from searchbar.js
  async function spotifySearch(searchValue){
    //setSearchResults(Spotify.search(searchValue));
    const token = await Spotify.fetchAccessToken();
    const apiSearchResults = await Spotify.search(token, searchValue);
    setSearchResults(apiSearchResults)
  }
  //callback function to add an item to playlist state for playlist component
  const addTrackToPlaylist = (track) => {
    //need a condition to check if songId exists in playlist state
    if(playlist.some(item => item.id === track.id)) return;
    setPlaylist(prev => [...prev, track]);
    console.log("Track added")
  }
  //callback function to give to Playlist to remove unwanted tracks
  const removeTrackFromPlaylist = (track) => {
    const filteredPlaylist = playlist.filter(item => item.id !== track.id);
    setPlaylist(filteredPlaylist);
  }
  //test function Im using to print some data to console
  const test = (t) => {
    console.log(playlist)
  }
  //3 react components needed for app: Searchbar, Results, Playlist
  //1 Module to process API requests: Spotify

  return (
    <div>
      <SearchBar sendSearch={spotifySearch} />
      <Results addTrack={addTrackToPlaylist} searchResults={searchResults} />
      <Playlist playlist={playlist} removeTrack={removeTrackFromPlaylist}/>
      <button onClick={test}>Click</button>
    </div>
  );
}

export default App;
