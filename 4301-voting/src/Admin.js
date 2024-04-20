import React, { useState, useEffect } from 'react';
import './css/Admin.css'; 

function Admin() {
  return (
    <div className='admin-container'>
      <div className='candidate-container'>
        <input className='candidate-name' placeholder="Candidate Name"></input>
        <div className='candidate-party'></div>
        <div className='candidate-name'></div>
      </div>
      <div className='date-container'>
        <div className='start-date-container'>
          <p>Start Date</p>
          <input className='date-input' type='date'></input>
        </div>
        <div className='end-date-container'>
          <p>End Date</p>
          <input className='date-input' type='date'></input>
        </div>
      </div>
      <button className='candidate-button'>Add Candidate</button>
    </div>
  );
}
export default Admin;
