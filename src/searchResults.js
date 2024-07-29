import React from 'react';
import songData from './songTestData';

//section to display results of search
//map through array of song objects and display them in this section
//assign id to divs for each song list created
export default function SearchResults(props){
    
    //surely I will use useState to keep track of the tracks added from search results? Can I store it in the same loop as assigning divs?
    return (
        //need to add a clickhandler which updates state with newly added song
        <div>
            <h2>Results</h2>
            {songData.map(song => {
                return (
                    <div id={song.id} key={song.id}>
                        <p>{song.trackName}</p>
                        <p>{song.artistName}</p>
                        <p>{song.albumName}</p>
                        <button onClick={() => props.addToPlaylist(song)} className="addButton">+</button>
                    </div>
                )
            })}
        </div>
    )
}