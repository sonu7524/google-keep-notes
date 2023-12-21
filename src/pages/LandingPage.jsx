import React, { useEffect, useState } from "react"; 
import Header from "../components/Header";
import MainPage from "../components/MainPage";


export default function LandingPage() {
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
    const [filteredNotes, setFilteredNotes] = useState([]);
    useEffect(() => {
        const filterNotes = notes.filter((note) => {
            return note.title.toLowerCase().includes(search.toLowerCase());
        })
        setFilteredNotes(filterNotes);
    }, [search]);
    return (
        <div className="landing-page">
            <Header setSearch={setSearch} />
            <MainPage notes={notes} filteredNotes={filteredNotes} setFilteredNotes={setFilteredNotes} setNotes={setNotes} />
        </div>
    );
}