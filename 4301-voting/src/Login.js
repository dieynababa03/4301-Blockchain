/*import React from 'react'

const Login = () => {
  return(
  <div>
    <h1>login page</h1>
  </div>
  );
}
export default Login;*/
// LoginForm.js

import React, { useState } from 'react';
import './Login.css'; // Import CSS file

const LoginForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to authenticate user here
  };

  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
    if (!showPassword && event.target.value.trim() !== '') {
      setShowPassword(true);
    }
  };

  return (
    <div className="page-container">
    <div className="form-container">
      <div className="title"><h2 className="login-title">Login</h2></div>
      <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="idNumber"
            className="input-field"
            placeholder="ID number"
            value={idNumber}
            onChange={handleIdNumberChange}
          />
        </div>
        
        {showPassword && (
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
      </form>
      </div>

      <div className="btn">
        <button type="submit" className="login-button">Login</button>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
