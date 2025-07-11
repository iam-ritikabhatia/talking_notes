import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';

const Home = () => {
  const { notes, loading, error, createNote, deleteNote } = useContext(NoteContext);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (newNote) => {
    const result = await createNote(newNote);
    if (result.success) {
      setIsCreating(false);
    }
  };

  const handleView = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <h1>My Notes</h1>
      
      {isCreating ? (
        <div className="create-note-section">
          <h2>Create New Note</h2>
          <NoteForm 
            onSubmit={handleCreate} 
            buttonText="Create Note"
          />
          <button 
            onClick={() => setIsCreating(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsCreating(true)}
          className="create-btn"
        >
          Create New Note
        </button>
      )}
      
      <NoteList 
        notes={notes} 
        onEdit={handleView} 
        onDelete={deleteNote} 
      />
    </div>
  );
};

export default Home;