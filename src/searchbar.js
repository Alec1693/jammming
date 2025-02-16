import React, { useState } from "react";
import "./css/searchbar.module.css";

function SearchBar(props){
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        //onSubmit I should transfer the search entry back to the app component with callback function, then use the app component callback to initiate the API request
        props.sendSearch(search);
    }


    return (
        <div className="searchBar">
            <form onSubmit={handleSearch}>
                <input placeholder="Search for artist..." type="text" onChange={(e) => setSearch(e.target.value)} value={search} id="search"></input>
            </form>
        </div>
    )
}

export default SearchBar;