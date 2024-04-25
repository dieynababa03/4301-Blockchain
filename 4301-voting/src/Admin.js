import React, { useState, useEffect } from 'react';
import './css/Admin.css';

function Admin() {
  return (
    <div className='admin'>
      <div className='admin-container'>
        <p className='console-title'>Admin Console</p>
        <div className='candidate-input-container'>
          <div className='candidate-input-name-container'>
            <p>Candidate Name</p>
            <input className='candidate-input-name' placeholder="Enter Name"></input>
          </div>
          <div className='candidate-input-party-container'>
            <p>Candidate Party</p>
            <input className='candidate-input-party' placeholder="Enter Party"></input>
          </div>
        </div>
        <div className='date-input-container'>
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
    </div>

  );
}
export default Admin;
