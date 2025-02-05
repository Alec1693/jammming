import React, { useState } from "react";

function SearchBar(props){
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        //should I call the spotify module here and store the search results in a state in Searchbar or use a callback function to app and store in state there?
        //I think using a callback here to the app component and storing the state in app is best bc I will need to send data to sibling component
        //const searchResults = 
        //callback function to app
        props.storeSearch([["Josh Turner", "Long black train", "picURL:3341", "songID:444"],["Beastie Boys", "Paul Revere", "picURL:6509", "songID:552"]]);
    }


    return (
        <div>
            <form onSubmit={handleSearch}>
                <input placeholder="Search for artist..." type="text" onChange={(e) => setSearch(e.target.value)} value={search} id="search"></input>
            </form>
        </div>
    )
}

export default SearchBar;