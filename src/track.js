import React from 'react';


export default function Track({
    trackName,
    artistName,
    albumName,
    trackPreview,
    handleClick
}){
    return (
        <div>
            <p>{trackName}</p>
            <p>{artistName}</p>
            <p>{albumName}</p>
            <p>{trackPreview}</p>
        </div>
    )
}