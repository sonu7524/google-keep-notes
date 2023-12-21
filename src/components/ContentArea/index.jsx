import React, { useState, useRef, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import './styles.css';

function ContentArea({ addNote }) {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentAreaRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (contentAreaRef.current && !contentAreaRef.current.contains(event.target)) {
      setExpanded(false);
    }
  }

  function submitNote() {
    const newNote = {
      title,
      content,
    }
    addNote(newNote);
    setTitle("");
    setContent("");
    setExpanded(false);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" ref={contentAreaRef}>
        {isExpanded && <input className="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />}
        <textarea className="content" onClick={expand} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Take a note..." rows={isExpanded ? 3 : 1} />
        <Zoom in={isExpanded}>
          <Fab sx={{ color: "var(--black)", backgroundColor: "var(--bg)" }} onClick={submitNote}><AddIcon  /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default ContentArea;
