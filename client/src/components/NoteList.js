import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p className="empty-message">No notes available. Create one!</p>
      ) : (
        notes.map(note => (
          <NoteItem 
            key={note._id} 
            note={note} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))
      )}
    </div>
  );
};

export default NoteList;