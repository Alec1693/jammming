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
  //store the spotify authorization code to send playlist to api
  const [accessToken, setAccessToken] = useState('');
  //create a useEffect that runs only when the app component mounts. I want to use oauth2 to authorize access to users account with permission to create a new playlist
  //useEffect will also retrieve an access_token returned via url and store it in a variable to be used when sending api request to create a playlist and add songs to playlist
  //callback function to retrieve the search results from SearchBar
  useEffect(() => {
    //check if the accessToken state has been assigned the token from spotify api. if not then run the Spotify function fetchAccessToken and assign it to the accessToken state
    let token = Spotify.fetchAccessToken();
    setAccessToken(token);
  },)
  //create a function thats used as a callback to searchbar and calls the spotify search method using the value of item being searched from searchbar.js
  const spotifySearch = (searchValue) => {
    const apiSearchResults = Spotify.search(accessToken, searchValue);
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
  //callback to set the name of the playlist
  async function updatePlaylistName(name){
    //once this is called we will be creating the playlist and sending the playlist tracks to the api
    const apiResponse = await Spotify.createSpotifyPlaylist();
    console.log("Playlist created");
    console.log(apiResponse);
  }
  //test function Im using to print some data to console
  const test = (t) => {
    console.log(accessToken)
  }
  //3 react components needed for app: Searchbar, Results, Playlist
  //1 Module to process API requests: Spotify

  return (
    <div>
      <SearchBar sendSearch={spotifySearch} />
      <Results addTrack={addTrackToPlaylist} searchResults={searchResults} />
      <Playlist playlist={playlist} removeTrack={removeTrackFromPlaylist} updatePlaylistName={updatePlaylistName} />
      <button onClick={test}>Click</button>
    </div>
  );
}

export default App;
