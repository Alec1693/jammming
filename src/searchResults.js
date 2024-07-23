import React, { useState } from 'react';

//section to display results of search
//map through array of song objects and display them in this section
//assign id to divs for each song list created
export default function SearchResults(props){
    //surely I will use useState to keep track of the tracks added from search results? Can I store it in the same loop as assigning divs?
    return (
        //need to add a clickhandler which updates state with newly added song
        <div>
            <h2>Results</h2>
            {props.songs.map(song => {
                if(!song.isAdded){
                    return (
                        <div id={song.id}>
                            <p>{song.trackName}</p>
                            <p>{song.artistName}</p>
                            <p>{song.albumName}</p>
                            <button className="addButton">+</button>
                        </div>
                    )
                }
            })}
        </div>
    )
}