import React, { useState } from "react";
import Note from "../Note";
import { v4 as uuidv4 } from 'uuid';
import ContentArea from "../ContentArea";
import './styles.css';



export default function MainPage({notes, setNotes, filteredNotes, setFilteredNotes}) {

  function addNote(newNote) {
    if (!newNote.color) {
      newNote.color = "var(--bg)";
    }
    newNote.id = uuidv4();
    setNotes((prevNotes) => {
      return [newNote, ...prevNotes];
    });
    setFilteredNotes((prevNotes) => {
      return [newNote, ...prevNotes];
    })
    localStorage.setItem("notes", JSON.stringify([newNote, ...notes]));
  }

  function handleEdit(id, editedTitle, editedContent) {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, title: editedTitle, content: editedContent };
      }
      return note;
    });
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter((noteItem) => noteItem.id !== id);
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  const onChangeColor = (id, color) => {
    const updatedNotes = notes.map((noteItem) => {
      if (noteItem.id === id) {
        return { ...noteItem, color: color };
      }
      return noteItem;
    });
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="main">
      <ContentArea addNote={addNote} />
      {filteredNotes ? (
        filteredNotes.map((noteItem) => (
          <Note
              key={noteItem.id}
              id={noteItem.id}
              color={noteItem.color}
              onChangeColor={onChangeColor}
              onEdit={handleEdit}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
          />
        ))
      ): (
        notes.map((noteItem) => {
          return (
            <Note
              key={noteItem.id}
              id={noteItem.id}
              color={noteItem.color}
              onChangeColor={onChangeColor}
              onEdit={handleEdit}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })
      )}
    </div>
  );
}
