import './App.css';
import SearchBar from './searchBar/searchBar';
import songData from './songTestData';
import SongDisplay from './songsDisplay/songsDisplay';
import React, { useState } from 'react';

function App() {
  let whatToReturn = [];
  function playlistReturn(list, name){
    whatToReturn.push([list, name]);
  }
  function printResults(){
    console.log(whatToReturn);
  }
  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar sendSearch={sendSearch}/>
      <SongDisplay playlistReturn={playlistReturn} search={search} data={songData}/>
    </div>
  );
}

export default App;
