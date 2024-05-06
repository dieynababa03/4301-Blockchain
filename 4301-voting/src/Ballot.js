import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/Ballot.css";
import { nodeApi } from './axiosConfigs';
import Web3 from 'web3';

export const Ballot = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedCandidates, setSelectedCandidates] = useState(new Set());
    const [votingDates, setVotingDates] = useState('');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const web3 = new Web3('http://127.0.0.1:7545');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const datesResponse = await nodeApi.get('/ballot/votingDates');
            const dates = datesResponse.data.data;
            setVotingDates(`${dates.votingStart} - ${dates.votingEnd}`);
    
            const candidatesResponse = await nodeApi.get('/ballot/candidates');
            const validCandidates = candidatesResponse.data.data.filter(candidate => 
                candidate && candidate.id != 0
            );
            setCandidates(validCandidates);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    

    const handleSelectCandidate = (candidateId) => {
        const newSelection = new Set(selectedCandidates);
        if (newSelection.has(candidateId)) {
            newSelection.delete(candidateId);
        } else {
            newSelection.add(candidateId);
        }
        setSelectedCandidates(newSelection);
    };

    const checkVoterStatus = async (hashedDLID) => {
        try {
            const response = await nodeApi.get(`/ballot/voterStatus/${hashedDLID}`);
            return response.data.data.hasVoted;  
        } catch (error) {
            console.error('Error checking voter status:', error);
            return false;  
        }
    };

    const handleSubmit = async () => {
        if (isAdmin) {
            try {
                const candidateIds = Array.from(selectedCandidates); 
                await nodeApi.delete('/admin/deleteCandidate', { data: { candidateIds } });
                alert('Candidates deleted successfully!');
                fetchData(); 
            } catch (error) {
                console.error('Failed to delete candidates:', error);
                alert(`Failed to delete candidates: ${error.response ? error.response.data.message : error.message}`);
            }
        } else {
            if (!selectedOption) return alert("Please select a candidate to vote.");
            const hashedDLID = localStorage.getItem('userDLHash'); 
            try {

                const hasAlreadyVoted = await checkVoterStatus(hashedDLID);
                console.log(hasAlreadyVoted)

                if (hasAlreadyVoted) {
                    alert("You have already voted. You cannot vote again.");
                    return;
                }

                const response = await nodeApi.post('/ballot/vote', {
                    candidateID: selectedOption,
                    hashedDLID
                });
                alert('Vote submitted successfully!');
                fetchData(); 
            } catch (error) {
                console.error('Failed to submit vote:', error);
                alert('Failed to submit vote.');
            }
        }
    };

    return (
        <div className="page-container">
            <div className="content-container">
                <div className="title">
                    <p className="election">Presidential Election</p>
                    <p className="dates">Voting Dates: {votingDates}</p>
                </div>
                <div className="candidate-container">
                    {candidates.map((candidate) => (
                        <div key={candidate.id} className="box">
                            <p>{candidate.name} ({candidate.party})</p>
                            <p>Count: {candidate.voteCount}</p>
                            {isAdmin ? (
                                <button className="candidate-button" onClick={() => handleSelectCandidate(candidate.id)}>
                                    {selectedCandidates.has(candidate.id) ? "Deselect" : "Delete"}
                                </button>
                            ) : (
                                <input type="radio" name="candidate" value={candidate.id} onChange={(e) => setSelectedOption(e.target.value)} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="submit">
                    <button onClick={handleSubmit}>{isAdmin ? "Submit Changes" : "Submit Vote"}</button>
                </div>
            </div>
        </div>
    );
};

export default Ballot;
