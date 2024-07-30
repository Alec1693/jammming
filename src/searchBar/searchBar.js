import React from 'react';

export default function SearchBar(props){
    function getSearch(){
        let element = document.getElementById("searchInput").innerHTML;
        if(element){
            return element;
        }
    }
    //call the search results component here to display the results form the onClick search results?
    return (
        <div>
            <input id="searchInput" type="text" name="searchBox" placeholder="Type an Artist, Song, or Album"/>
            <button onClick={props.sendSearch(getSearch())} type="button">Search</button>
        </div>
    )
}