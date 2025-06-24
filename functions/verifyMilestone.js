// functions/verifyMilestone.js
const axios = require('axios');

module.exports = async function verifyMilestone(request) {
  // Example: call an AI API or some external verification
  try {
    const milestoneData = request.data; // data passed from on-chain or client

    // For demo, we pretend to call OpenAI or another API
    const response = await axios.post('https://api.example.com/verify', {
      milestone: milestoneData,
    });

    // Return result that Chainlink contract expects
    return {
      verified: response.data.verified,
      details: response.data.details,
    };
  } catch (error) {
    console.error('Verification failed:', error);
    return {
      verified: false,
      details: 'Error during verification',
    };
  }
};
