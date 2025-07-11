import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteContext } from '../context/NoteContext';
import NoteForm from '../components/NoteForm';

const NotePage = () => {
  const { id } = useParams();
  const { notes, updateNote } = useContext(NoteContext);
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundNote = notes.find(n => n._id === id);
    if (foundNote) {
      setNote(foundNote);
    } else {
      navigate('/');
    }
  }, [id, notes, navigate]);

  const handleUpdate = async (updatedNote) => {
    const result = await updateNote(id, updatedNote);
    if (result.success) {
      navigate('/');
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="note-page">
      <h1>Edit Note</h1>
      <NoteForm 
        initialNote={note} 
        onSubmit={handleUpdate} 
        buttonText="Update Note"
      />
      <button 
        onClick={() => navigate('/')}
        className="back-btn"
      >
        Back to Notes
      </button>
    </div>
  );
};

export default NotePage;