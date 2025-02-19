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
                            <div className="track-det-spc">
                                <p>{track.name}</p>
                                <div className="track-det">
                                    <div className="track-aa">
                                        <p>{track.artist}     |     {track.album}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="track-btn" onClick={() => handleClick(track)}>+</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Track;