// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Removed Navigate from here
import { NoteProvider } from './context/NoteContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import NotePage from './pages/NotePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/notes/:id" element={<PrivateRoute><NotePage /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;