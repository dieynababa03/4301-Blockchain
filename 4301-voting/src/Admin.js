import React, { useState } from 'react';
import axios from 'axios';
import { nodeApi } from './axiosConfigs';
import './css/Admin.css';

function Admin() {
    const [name, setName] = useState('');
    const [party, setParty] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await nodeApi.post('/admin/addCandidate', { name, party });
            alert(`Candidate added successfully: ${response.data.message}`);
        } catch (error) {
            console.error('Failed to add candidate:', error);
            alert(`Failed to add candidate: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className='admin'>
            <div className='admin-container'>
                <p className='console-title'>Admin Console</p>
                <form onSubmit={handleSubmit} className='candidate-input-container'>
                    <div className='candidate-input-name-container'>
                        <p>Candidate Name</p>
                        <input 
                            className='candidate-input-name' 
                            placeholder="Enter Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='candidate-input-party-container'>
                        <p>Candidate Party</p>
                        <input 
                            className='candidate-input-party' 
                            placeholder="Enter Party" 
                            value={party} 
                            onChange={(e) => setParty(e.target.value)}
                        />
                    </div>
                </form>
                <button type="submit" className='candidate-button'>Add Candidate</button>
            </div>
        </div>
    );
}

export default Admin;
