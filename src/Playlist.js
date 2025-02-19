import React, { useState } from "react";
import "./app.css"

function Playlist(props){
    //state to hold the value of the playlistName
    const [playlistName, setPlaylistName] = useState("");
    //need a function to call for onClick with track button so it can be added to a "playlist" state. 
    //for now I'll hard code a track to see if it lets me add, then i'll hard code a duplicate to make sure duplicates can't be added
    const handleTrackClick = (track) => {
        props.removeTrack(track);
    }
    const handlePlaylistNaming = (e) => {
        e.preventDefault();
        props.updatePlaylistName(playlistName);
    }
    return (
        <div className="sResultsAndPlaylist">
            <form onSubmit={handlePlaylistNaming}>
                <input className="trackForm" type="text" placeholder="Name your playlist here..." value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}></input>
            </form>
            {props.playlist.length > 0 ? (
                props.playlist.map(track => {
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
                                <button className="track-btn" onClick={() => handleTrackClick(track)}>+</button>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p>Tracks added to playlist will appear here</p>
            )}
        </div>
    )
}

export default Playlist;