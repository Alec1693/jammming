import React, { useState } from 'react';
import SearchResults from '../searchResults/searchResults';
import Playlist from '../playlist/playlist';


export default function SongDisplay(props){
    const [listName, setListName] = useState('');
    const [playlist, setPlaylist] = useState([]);
    function addListName(name){
        setListName(name);
        console.log(name);
    }
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
            <Playlist addListName={addListName} playlist={playlist} removeSongFromPlaylist={removeSongFromPlaylist}/>
            <h2>testing</h2>
            <p>name:{listName}</p>
        </div>
    )
}