import React from "react";

function Results(props){
    //need a function to call for onClick with track button so it can be added to a "playlist" state. 
    //for now I'll hard code a track to see if it lets me add, then i'll hard code a duplicate to make sure duplicates can't be added
    const handleClick = (track) => {
        props.addTrack(track);
    }
    return (
        <div>
            {props.searchResults ? (
                props.searchResults.map(track => {
                    return (
                        <div id={track[3]} key={track[3]}>
                            <p>{track[0]}</p>
                            <p>{track[1]}</p>
                            <p>{track[2]}</p>
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