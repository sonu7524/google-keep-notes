import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import './styles.css'

function Header({setSearch}) {
    let[searchInput, setSearchInput] = useState('');
    const handleSearch = () => {
        setSearch(searchInput);
    }
    return (
        <header>
            <div className="header-content">
                <img className="header-logo" src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png"></img>
                <h1>KEEP NOTES</h1>
            </div>
            <div className="header-search">
                <div className="search-icon"><SearchIcon sx={{ color: 'grey' }} /></div>
                <input className="search-input" type="text" placeholder="Search" onChange={(event) => setSearchInput(event.target.value)} value={searchInput} onKeyUp={handleSearch} />
            </div>
        </header>
    )
}

export default Header;