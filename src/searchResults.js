import React from 'react';

//should this accept an array of objects to display results?
//map through results and display generated list as 

export default function SearchResults(props){
    return (
        <div>
            <h2>Results</h2>
            {props.data.map(id => {
                return (
                    <div>
                        <p>{id.trackName}</p>
                        <p>{id.artistName}</p>
                        <p>{id.albumName}</p>
                    </div>
                )
            })}
        </div>
    )
}