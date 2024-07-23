import React from 'react';

//pass the track added from the search results to the playlist
//playlist needs input field to name playlist, thne display selected songs beneath
export default function Playlist(props){
    return(
        <div>
            <input placeholder="Name your playlist"/>
            {props.songs.map(song => {
                if(song.isAdded){
                    return (
                        <div>
                            <p>{song.trackName}</p>
                            <p>{song.artistName}</p>
                            <p>{song.albumName}</p>
                            <button>-</button>
                        </div>
                    )
                }
            })}
            <button>Save to Spotify</button>
        </div>
    )
}