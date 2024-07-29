import React from 'react';

//pass the track added from the search results to the playlist
//playlist needs input field to name playlist, thne display selected songs beneath
export default function Playlist(props){
    return(
        <div>
            <input type="text" id="playlistName" placeholder="Name your playlist"/>
            {props.playlist.map(song => {
                return (
                    <div key={song.id}>
                        <p>{song.trackName}</p>
                        <p>{song.artistName}</p>
                        <p>{song.albumName}</p>
                        <button onClick={() => props.removeSongFromPlaylist(song)}>-</button>
                    </div>
                )
            })}
            <button>Save to Spotify</button>
        </div>
    )
}