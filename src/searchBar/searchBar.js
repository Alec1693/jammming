import React from 'react';

export default function SearchBar(props){
    function handleClick(){
        let element = document.getElementById("searchInput").innerHTML;
        if(element){
            props.sendSearch(element);
        }
    }
    return (
        <div>
            <input id="searchInput" type="text" name="searchBox" placeholder="Type an Artist, Song, or Album"/>
            <button onClick={handleClick} type="button">Search</button>
        </div>
    )
}