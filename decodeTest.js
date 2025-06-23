console.log("🚀 Starting decode test...");

const { decodeResult } = require('@chainlink/functions-toolkit');

// ✅ Hardcoded valid 32-byte (64-char) hex for 3000 (0x0bb8)
const dummyResponseHex = "0000000000000000000000000000000000000000000000000000000000000bb8";

console.log("ℹ️ Hex string length:", dummyResponseHex.length);

// ✅ Validate hex string before decoding
if (dummyResponseHex.length !== 64) {
  throw new Error("❌ Hex string must be 64 characters long (32 bytes)");
}
if (!/^[0-9a-fA-F]+$/.test(dummyResponseHex)) {
  throw new Error("❌ Hex string contains non-hex characters");
}

// ✅ Convert to buffer
const dummyResponse = Buffer.from(dummyResponseHex, "hex");

console.log("🔍 Decoding...");
const decoded = decodeResult(dummyResponse, "uint256");
console.log("✅ Decoded result:", decoded.toString()); // Should print "3000"
