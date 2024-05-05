const express = require('express');
const EthereumService = require('./ethereumService'); 
const router = express.Router();

// Vote endpoint
router.post('/vote', async (req, res) => {
  const { candidateID, hashedDLID } = req.body;
  try {
    const method = 'vote';
    const params = [candidateID, hashedDLID];
    const result = await EthereumService.sendTransaction(method, params);
    const data = result.toString();
    res.json({ success: true, message: "Vote successfully recorded", data: data });
  } catch (error) {
    console.error('Failed to record vote:', error);
    res.status(500).json({ success: false, message: "Failed to vote", error: error.message });
  }
});

// Retrieve all candidates
router.get('/candidates', async (req, res) => {
  try {
    const method = 'getAllCandidates';
    const params = [];
    const result = await EthereumService.call(method, params);

    const ids = result[0];
    const names = result[1];
    const parties = result[2];
    const voteCounts = result[3];

    // Create an array of candidates from the results
    const candidates = ids.map((id, index) => ({
      id: id.toString(), // Convert numeric ID to string if needed
      name: names[index],
      party: parties[index],
      voteCount: voteCounts[index].toString() // Convert BigInt to string if it's a BigInt
    }));

    res.json({ success: true, message: "All candidates retrieved", data: candidates });
  } catch (error) {
    console.error('Failed to get all candidates:', error);
    res.status(500).json({ success: false, message: "Failed to retrieve all candidates", error: error.message });
  }
});


// Retrieve voting dates
router.get('/votingDates', async (req, res) => {
  try {
    const method = 'getVotingDates';
    const params = []; 
    const result = await EthereumService.call(method, params);
    console.log(result)
    const data = {
      votingStart: new Date(parseInt(result[0].toString()) * 1000).toLocaleDateString(), // Convert BigInt to Number and then to Date
      votingEnd: new Date(parseInt(result[1].toString()) * 1000).toLocaleDateString()   // Convert BigInt to Number and then to Date
    };
    res.json({ success: true, message: "Voting dates retrieved", data: data });
  } catch (error) {
    console.error('Failed to retrieve voting dates:', error);
    res.status(500).json({ success: false, message: "Failed to retrieve voting dates", error: error.message });
  }
});


// Check voter status
router.get('/voterStatus/:hashedDLID', async (req, res) => {
  const hashedDLID = req.params.hashedDLID;
  try {
    const method = 'checkVoterStatus';
    const params = [hashedDLID];
    const result = await EthereumService.call(method, params);
    res.json({ success: true, message: "Voter status retrieved", data: { hasVoted: result } });
  } catch (error) {
    console.error('Failed to check voter status:', error);
    res.status(500).json({ success: false, message: "Failed to check voter status", error: error.message });
  }
});
module.exports = router;
