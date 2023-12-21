import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import './styles.css'

function Header({setSearch}) {
    let[searchInput, setSearchInput] = useState('');
    const handleSearchBtn = () => {
        setSearch(searchInput);
        setSearchInput('');
    }
    return (
        <header>
            <div className="header-content">
                <img className="header-logo" src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png"></img>
                <h1>KEEP NOTES</h1>
            </div>
            <div className="header-search">
                <input className="search-input" type="text" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)} />
                <button onClick={handleSearchBtn} className="search-btn"><SearchIcon /></button>
            </div>
        </header>
    )
}

export default Header;