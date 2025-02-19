import SearchBar from "./searchbar";
import TrackList from "./TrackList"
import React, { useState, useEffect } from "react";
import Spotify from "./utils/Spotify";
import Playlist from "./Playlist";
import "./app.css"

function App() {
  //state stores results from search via spotify api
  const [searchResults, setSearchResults] = useState([]);
  //state to store the playlist user is adding to
  const [playlist, setPlaylist] = useState([]);
  //store the spotify authorization code to send playlist to api
  const [accessToken, setAccessToken] = useState('');
  //store the name of the user we received the token from
  const [username, setUsername] = useState('');
  //create a useEffect that runs only when the app component mounts. I want to use oauth2 to authorize access to users account with permission to create a new playlist
  //useEffect will also retrieve an access_token returned via url and store it in a variable to be used when sending api request to create a playlist and add songs to playlist
  //callback function to retrieve the search results from SearchBar
  useEffect(() => {
    //check if the accessToken state has been assigned the token from spotify api. if not then run the Spotify function fetchAccessToken and assign it to the accessToken state
    let token = Spotify.fetchAccessToken();
    setAccessToken(token);
    async function getData(){
      try{
        const response = await Spotify.getUserData(token);
        setUsername(response.display_name);
      }catch(e){
        console.error("Error fetching user data in useEffect", e)
      }
    }
    getData();
  },[])
  //create a function thats used as a callback to searchbar and calls the spotify search method using the value of item being searched from searchbar.js
  async function spotifySearch(searchValue){
    const apiSearchResults = await Spotify.search(accessToken, searchValue)
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
    const apiResponse = await Spotify.createPlaylistWithTracks(accessToken, name, playlist);
    console.log("Playlist created");
    console.log(apiResponse);
  }

  return (
    <div>
      <div className="jamHeading">
        <h2>Ja<span>mmm</span>ing</h2>
      </div>
      <div className="userHeading">
        <h3>Hello, {username}</h3>
      </div>
      <SearchBar className="" sendSearch={spotifySearch} />
      <div className="rAndPDiv">
        <div className="rAndP results">
          <TrackList addTrack={addTrackToPlaylist} searchResults={searchResults} />
        </div>
        <div className="rAndP playlist">
          <Playlist playlist={playlist} removeTrack={removeTrackFromPlaylist} updatePlaylistName={updatePlaylistName} />
        </div>
      </div>
    </div>
  );
}

export default App;
