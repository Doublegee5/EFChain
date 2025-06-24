// simulateRequest.js
console.log("Starting decode test...");

// Hardcoded Chainlink-like hex string (3000 padded to 32 bytes)
const dummyResponseHex = "0000000000000000000000000000000000000000000000000000000000000bb8";

console.log("Hex string length:", dummyResponseHex.length);

// Validate length
if (dummyResponseHex.length !== 64) {
  throw new Error("Hex string must be 64 characters long (32 bytes for uint256)");
}

// Validate hex characters
if (!/^[0-9a-fA-F]+$/.test(dummyResponseHex)) {
  throw new Error("Hex string contains non-hex characters");
}

// Decode the hex string to number
const decodedNumber = parseInt(dummyResponseHex, 16);

console.log("Decoded number:", decodedNumber);
