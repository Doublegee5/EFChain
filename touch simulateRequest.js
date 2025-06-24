// simulateRequest.js

console.log("Starting Chainlink Functions request simulation...");

// Example async function simulating a Chainlink Functions call
async function simulateChainlinkRequest() {
  // Simulated data returned from a Chainlink function (replace with your real logic)
  const simulatedResponse = "0x0000000000000000000000000000000000000000000000000000000000000bb8"; // hex for 3000 padded to 32 bytes

  console.log("Simulated response hex string:", simulatedResponse);

  // You can add your decoding logic here if you want
  // For now, just log the number (3000 decimal)
  const decodedNumber = parseInt(simulatedResponse, 16);

  console.log("Decoded number from hex:", decodedNumber);
}

simulateChainlinkRequest()
  .then(() => console.log("Simulation completed."))
  .catch((error) => console.error("Simulation error:", error));
