import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userDLHash');
    navigate('/');
  };

  return (
    <nav>
      {isLoggedIn ? (
        <div className='navbar'>
          <button onClick={() => navigate('/ballot')}>Candidates</button>
          {isAdmin && <button onClick={() => navigate('/admin')}>Admin</button>}
          <button className="login-logout" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className='navbar'>
          <button onClick={() => navigate('/ballot')}>Candidates</button>
          <button className="login-logout" onClick={() => navigate('/')}>Login</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
