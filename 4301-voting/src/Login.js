import React, { useState } from 'react';
import './css/Login.css'; // Import CSS file

const LoginForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [incorrectInfo, setIncorrectInfo] = useState({
    attempt: false,
    incorrect: false
  });

  // Handle changes to the ID number input
  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = { idNumber };
    console.log(userInfo);
    fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userInfo })
    }).then(response => response.json())
      .then(res => {
        console.log(res);
        if (res === "True") {
          setLoggedIn(true);
          setIncorrectInfo({ attempt: false, incorrect: false });
        } else {
          setIncorrectInfo({ attempt: true, incorrect: true });
        }
      }).catch(error => {
        console.error('Error:', error);
        setIncorrectInfo({ attempt: true, incorrect: true });
      });
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
              onChange={handleIdNumberChange} // Add this line
            />
            {incorrectInfo.attempt && incorrectInfo.incorrect && <p className="incorrectInfo">Incorrect ID</p>}
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
