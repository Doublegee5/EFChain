console.log("🚀 Starting decode test...");

const { decodeResult } = require('@chainlink/functions-toolkit');

// ✅ Hardcoded valid uint256 hex string: 3000 = 0x0bb8
const dummyResponseHex = "0000000000000000000000000000000000000000000000000000000000000bb8";

// ✅ Debug info
console.log("Hex string length:", dummyResponseHex.length);

// ✅ Validate the hex string
if (dummyResponseHex.length !== 64) {
  throw new Error("❌ Hex string must be 64 characters long (32 bytes for uint256)");
}

if (!/^[0-9a-fA-F]+$/.test(dummyResponseHex)) {
  throw new Error("❌ Hex string contains non-hex characters");
}

// ✅ Convert to buffer
const dummyResponse = Buffer.from(dummyResponseHex, "hex");

console.log("👉 Decoding...");
const decoded = decodeResult(dummyResponse, "uint256");
console.log("✅ Decoded result:", decoded.toString()); // Should print "3000"
