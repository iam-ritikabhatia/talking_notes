import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const NoteItem = ({ note, onEdit, onDelete }) => {
  
  const getCategory = () => {
    if (note.content.includes('TODO') || note.content.includes('todo')) return 'Task';
    if (note.content.includes('http')) return 'Link';
    return 'Note';
  };

  return (
    <div className="note-item">
      <div className="note-content">
        <div className="category-tag">{getCategory()}</div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <small>
          {new Date(note.updatedAt).toLocaleString()}
        </small>
      </div>
      <div className="note-actions">
        <button onClick={() => onEdit(note)} aria-label="Edit note">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(note._id)} aria-label="Delete note">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;