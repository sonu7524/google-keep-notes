import React, { useState, useEffect, useRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './styles.css';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { CirclePicker } from 'react-color';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Tooltip from '@mui/material/Tooltip';

function Note(props) {
  const [color, setColor] = useState(props.color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const contentAreaRef = useRef();

  useEffect(() => {
    props.onChangeColor(props.id, color);
  }, [color, props.id]);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {

    if (contentAreaRef.current && !contentAreaRef.current.contains(event.target)) {
      setDisplayColorPicker(false);
    }
  }

  const handleColorPickerClick = (event) => {
    event.stopPropagation();
    setDisplayColorPicker(true);

    setIsEditing(false); // Close editing when color picker opens
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    setIsEditing(true);
    setDisplayColorPicker(false); // Close color picker when editing starts
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    props.onEdit(props.id, editedTitle, editedContent);
    setIsEditing(false);
  };

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className={`note ${isEditing ? 'editing' : ''}`} style={{ backgroundColor: color }}>
      
      {isEditing ? (
        <div className="edit-container">
          <input className="edit-title" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <textarea
            className="edit-content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={isEditing ? 3 : 1}
          />
        </div>
      ) : (
        <div className="card-body">
          <h3 className="card-title">{props.title}</h3>
          <p className="card-content">{props.content}</p>
        </div>
      )}
      <div className="card-footer">
        <div className="color-picker" onClick={handleColorPickerClick}>
          <Tooltip title="Color Picker">
            <ColorLensIcon />
          </Tooltip>
        </div>
        <button className="delete" onClick={handleClick}>
          <Tooltip title="Delete">
            <DeleteIcon />
          </Tooltip>
        </button>
        {!isEditing && (
          <button style={{ background: 'transparent' }} className="edit" onClick={handleEditClick}>
            <Tooltip title="Edit Notes">
              <EditIcon />
            </Tooltip>
          </button>
        )}
        {isEditing && (
          <button style={{ background: 'transparent' }} className="save" onClick={handleSaveClick}>
            <Tooltip title="Save">
              <SaveAsIcon />
            </Tooltip>
          </button>
        )}
      </div>
      {displayColorPicker ? (
        <div ref={contentAreaRef} className="color-picker-container" >
          <CirclePicker color={color} onChange={(selectedColor) => setColor(selectedColor.hex)} />
        </div>
      ) : null}
    </div>
  );
}

export default Note;
