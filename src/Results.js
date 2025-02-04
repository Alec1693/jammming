import React from "react";

function Results(props){
    return (
        <div>
            {props.trackResults ? (
                props.searchResults.map(track => {
                    return (
                        <div id={track[3]} key={track[3]}>
                            <p>{track[0]}</p>
                            <p>{track[1]}</p>
                            <p>{track[2]}</p>
                        </div>
                    )
                })
            ) : (
                <p>Waiting on search results</p>
            )}
        </div>
    )
}

export default Results;