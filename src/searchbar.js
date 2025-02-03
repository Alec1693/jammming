import React, { useState } from "react";

function SearchBar(){
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("You pressed enter!");
    }


    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} id="search"></input>
            </form>
        </div>
    )
}

export default SearchBar;