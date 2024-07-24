import React, { useState } from 'react';
import SearchResults from './searchResults';
import Playlist from './playlist';


export default function SongDisplay(props){
    const [songList, setSongList] = useState(props.data);
    return (
        //pass the props to both components and let the components determine whether to render or not based on key in song object
        <div>
            <SearchResults songs={songList} addToPlaylist={(songList) => setSongList({songList})}/>
            <Playlist songs={songList}/>
        </div>
    )
}