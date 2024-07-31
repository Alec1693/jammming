import React from 'react';

export default function SearchBar(props){
    return (
        <div>
            <input id="searchInput" type="text" name="searchBox" placeholder="Type an Artist, Song, or Album"/>
            <button type="button">Search</button>
        </div>
    )
}