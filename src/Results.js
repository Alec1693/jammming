import React from "react";

function Results(props){
    //need a function to call for onClick with track button so it can be added to a "playlist" state. 
    //for now I'll hard code a track to see if it lets me add, then i'll hard code a duplicate to make sure duplicates can't be added
    const handleClick = (track) => {
        props.addTrack(track);
    }
    return (
        <div>
            {props.searchResults.length > 0 ? (
                props.searchResults.map(track => {
                    return (
                        <div id={track.id} key={track.id}>
                            <p>{track.name}</p>
                            <p>{track.album}</p>
                            <p>{track.artist}</p>
                            <img src={track.albumCover} alt="Album Cover"></img>
                            <button onClick={() => handleClick(track)}>+</button>
                        </div>
                    )
                })
            ) : (
                <p>Waiting on search results</p>
            )}
        </div>
    )
}

export default Results;