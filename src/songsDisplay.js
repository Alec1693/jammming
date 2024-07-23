import React from 'react';
import SearchResults from './searchResults';
import Playlist from './playlist';


export default function SongDisplay(props){
    return (
        //pass the props to both components and let the components determine whether to render or not based on key in song object
        <div>
            <SearchResults songs={props.data}/>
            <Playlist songs={props.data}/>
        </div>
    )
}