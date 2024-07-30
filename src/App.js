import './App.css';
import SearchBar from './searchBar/searchBar';
import songData from './songTestData';
import SongDisplay from './songsDisplay/songsDisplay';
import React, { useState } from 'react';

function App() {
  const [search, setSearch] = useState([]);
  function sendSearch(results){
    setSearch(prevSearch => [...prevSearch, results]);
  }
  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar sendSearch={sendSearch}/>
      <SongDisplay search={search} data={songData}/>
    </div>
  );
}

export default App;
