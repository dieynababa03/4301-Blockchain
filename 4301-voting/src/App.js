import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Navbar';
import Login from './Login';
import Admin from './Admin';
import Ballot from './Ballot';
import './css/App.css'
import { AuthProvider } from './AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/ballot" element={<Ballot />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
