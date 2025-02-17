import React from "react";
import "./app.css"

function Track(props){
    const handleClick = (track) => {
        props.addTrack(track);
    }
    return(
        <div>
            {
                props.searchResults.map(track => {
                    return (
                        <div className="tracks" id={track.id} key={track.id}>
                            <p>{track.name}</p>
                            <p>{track.artist}</p>
                            <p>{track.album}</p>
                            <button className="trackBtn" onClick={() => handleClick(track)}>+</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Track;