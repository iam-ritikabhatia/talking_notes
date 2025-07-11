import React, { useState } from 'react';

const NoteForm = ({ initialNote = { title: '', content: '' }, onSubmit, buttonText = 'Save' }) => {
  const [note, setNote] = useState(initialNote);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!note.title.trim() || !note.content.trim()) {
      setError('Both title and content are required');
      return;
    }
    
    setError('');
    onSubmit(note);
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Enter note title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Enter note content"
          rows="5"
        />
      </div>
      <button type="submit" className="submit-btn">
        {buttonText}
      </button>
    </form>
  );
};

export default NoteForm;