import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';  
import { useAuth } from './AuthContext'; 
import './css/Login.css'; 

const LoginForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [incorrectInfo, setIncorrectInfo] = useState(false);

  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
    setIncorrectInfo(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (idNumber.length !== 9) {
      setIncorrectInfo(true);
      return;
    }

    const hashedIdNumber = ethers.keccak256(ethers.toUtf8Bytes(idNumber));

    try {
      const response = await axios.post('/Login', { userInfo: { idNumber: hashedIdNumber } });
      const res = response.data;

      if(res.authenticated) {
        login(res.admin);
        if(res.admin) {
          navigate('/admin');
        } else {
          navigate('/ballot');
        }
      } else {
        setIncorrectInfo(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setIncorrectInfo(true);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="title"><h2 className="login-title">Login</h2></div>
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
            {incorrectInfo && <p className="incorrectInfo">Incorrect ID or length not valid</p>}
          </div>
        </form>
        <button type="submit" className="login-button">Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
