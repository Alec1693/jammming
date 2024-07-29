import React, { useState } from 'react';
import SearchResults from './searchResults';
import Playlist from './playlist';


export default function SongDisplay(props){
    const [playlist, setPlaylist] = useState([]);
    function addToPlaylist(song){

        setPlaylist(prevPlaylist => [...prevPlaylist, song]);
    }
    function removeSongFromPlaylist(song){
        setPlaylist(playlist.filter(fSong => fSong.id !== song.id))
    }
    return (
        //pass the props to both components and let the components determine whether to render or not based on key in song object
        <div>
            <SearchResults addToPlaylist={addToPlaylist}/>
            <Playlist playlist={playlist} removeSongFromPlaylist={removeSongFromPlaylist}/>
        </div>
    )
}