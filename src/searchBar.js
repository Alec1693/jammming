import React from 'react';

export default function SearchBar(){
    const handleClick = () => {
        let searchText = document.getElementById("searchInput").value;

        console.log(searchText)
    }


    return (
        <div>
            <input id="searchInput" type="text" name="searchBox" placeholder="Type an Artist, Song, or Album"/>
            <button onClick={handleClick} type="button">Search</button>
        </div>
    )
}