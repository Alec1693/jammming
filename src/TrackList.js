import React from "react";
import Track from "./Track";

function TrackList(props){
    return (
        <div>
            {props.searchResults.length > 0 ? (
                <Track searchResults={props.searchResults} addTrack={props.addTrack} />
            ) : (
                <p>Waiting on search results</p>
            )}
        </div>
    )
}

export default TrackList;