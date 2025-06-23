console.log("✅ Starting decode test...");

const { decodeResult } = require('@chainlink/functions-toolkit');

// This is 3000 in uint256 (hex: 0x0bb8) padded to 64 characters
const dummyResponseHex = "0000000000000000000000000000000000000000000000000000000000000bb8";

console.log("ℹ️ Hex string length:", dummyResponseHex.length);

// Validation checks
if (dummyResponseHex.length !== 64) {
  throw new Error("❌ Hex string must be 64 characters long (32 bytes for uint256)");
}

if (!/^[0-9a-fA-F]+$/.test(dummyResponseHex)) {
  throw new Error("❌ Hex string contains non-hex characters");
}

// Convert hex to Buffer
const dummyResponse = Buffer.from(dummyResponseHex, "hex");

console.log("🔍 Decoding...");
const decoded = decodeResult(dummyResponse, "uint256");

console.log("✅ Decoded result:", decoded.toString()); // Should print 3000
