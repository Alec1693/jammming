import React from 'react';

//pass the track added from the search results to the playlist
//playlist needs input field to name playlist, thne display selected songs beneath
export default function Playlist(){
    return(
        <div>
            <input placeholder="Name your playlist"/>
            <button>Save to Spotify</button>
        </div>
    )
}