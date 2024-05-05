const express = require('express');
const EthereumService = require('./ethereumService'); // Make sure the path is correct based on your project structure
const router = express.Router();

const convertBigInt = (value) => {
  if (typeof value === 'bigint') {
      return value.toString();
  } else if (Array.isArray(value)) {
      return value.map(convertBigInt);
  } else if (value !== null && typeof value === 'object') {
      Object.keys(value).forEach(key => {
          value[key] = convertBigInt(value[key]);
      });
      return value;
  }
  return value;
};


router.post('/addCandidate', async (req, res) => {
  const { name, party } = req.body;
  
  try {
      const result = await EthereumService.sendTransaction('addCandidate', [name, party]);
      const responseData = {
          success: true,
          message: "Candidate added successfully",
          data: result.toString() 
      };
      res.json(responseData);
  } catch (error) {
      console.error('Failed to add candidate:', error);
      res.status(500).json({
          success: false,
          message: "Failed to add candidate",
          error: error.toString()  
      });
  }
});



router.delete('/deleteCandidate', async (req, res) => {
  const { candidateIds } = req.body;
  try {
      for (let id of candidateIds) {
          await EthereumService.sendTransaction('deleteCandidate', [id]);
      }
      res.json({ success: true, message: "Candidates deleted successfully" });
  } catch (error) {
      console.error('Failed to delete candidates:', error);
      res.status(500).json({ success: false, message: "Failed to delete candidates", error: error.toString() });
  }
});






module.exports = router;
