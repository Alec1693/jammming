import SearchBar from "./searchbar";
import React, { useState } from "react";

function App() {
  //state stores results from search via spotify api
  const [searchResults, setSearchResults] = useState([]);
  //callback function to retrieve the search results from SearchBar
  const storeSearchResults = (results) => {
    setSearchResults(results);
  }

  const test = (t) => {
    console.log(t)
  }
  //3 react components needed for app: Searchbar, Results, Playlist
  //1 Module to process API requests: Spotify

  return (
    <div>
      <SearchBar storeSearch={storeSearchResults}/>
    </div>
  );
}

export default App;
