import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchNotes = async () => {
  try {
    setLoading(true);
    const response = await axios.get('http://localhost:5000/api/notes', {
      withCredentials: true
    });
    setNotes(response.data);
    setError(null);
    return { success: true };
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to fetch notes');
    return { success: false, error: err.response?.data?.message || 'Failed to fetch notes' };
  } finally {
    setLoading(false);
  }
};

  const createNote = async (note) => {
  try {
    const response = await axios.post('http://localhost:5000/api/notes', note, {
      withCredentials: true
    });
    setNotes([response.data, ...notes]);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || 'Failed to create note' };
  }
};

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/notes/${id}`, updatedNote);
      setNotes(notes.map(note => note._id === id ? response.data : note));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to update note' };
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to delete note' };
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ 
      notes, 
      loading, 
      error, 
      createNote, 
      updateNote, 
      deleteNote 
    }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };