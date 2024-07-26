import React from 'react';

//pass the track added from the search results to the playlist
//playlist needs input field to name playlist, thne display selected songs beneath
export default function Playlist(props){
    function handleClick(){
        //handle submission of playlist and playlistName to spotify api
        
    }
    return(
        <div>
            <input id="playlistName" placeholder="Name your playlist"/>
            {props.playlist.map(song => {
                return (
                    <div key={song.id}>
                        <p>{song.trackName}</p>
                        <p>{song.artistName}</p>
                        <p>{song.albumName}</p>
                        <button>-</button>
                    </div>
                )
            })}
            <button>Save to Spotify</button>
        </div>
    )
}