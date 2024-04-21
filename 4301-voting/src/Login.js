import React, { useState, useEffect } from 'react';
import './css/Login.css'; // Import CSS file


const LoginForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [incorrectInfo, setIncorrectInfo] = useState({
    attempt: false,
    incorrect: false
  });
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {idNumber, password}
    console.log(userInfo)
    fetch('/Login', {
      'method': 'POST',
      body: JSON.stringify({
        userInfo
      }),
  }).then(response => response.json()
  ).then(res => {
    console.log(res)
    if (res === "True") {
      console.log("Res: " + res)
      setLoggedIn(true);
      setIncorrectInfo({
        attempt: false,
        incorrect: false
      })
    } else {
      console.log("Res: " + res)
      setIncorrectInfo({
        attempt: true,
        incorrect: true
      })
      console.log(incorrectInfo)
    }
  })
  };


  return (
    <div className="page-container">
    <div className="form-container">
      <div className="title"><h2 className="login-title">Login</h2></div>
      <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            {incorrectInfo.attempt === true && incorrectInfo.incorrect === true && <p className="incorrectInfo">Incorrect ID and Password</p>}
          </div>
          <input
            type="text"
            id="idNumber"
            className="input-field"
            placeholder="ID number"
            value={idNumber}
            onChange={handleIdNumberChange}
          />
        </div>
        
      </form>
      </div>

      <div className="btn">
        <button type="submit" className="login-button" onClick={handleSubmit}>Login</button>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
