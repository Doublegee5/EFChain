console.log("👉 Starting decode test...");
const { decodeResult } = require('@chainlink/functions-toolkit');

// ✅ 3000 as uint256: 0x0bb8 padded to 32 bytes
const dummyResponseHex = "0000000000000000000000000000000000000000000000000000000000000bb8";

// Debug
console.log("Hex string length:", dummyResponseHex.length);

// Validate
if (dummyResponseHex.length !== 64) {
  throw new Error("❌ Hex string must be 64 characters long.");
}
if (!/^[0-9a-fA-F]+$/.test(dummyResponseHex)) {
  throw new Error("❌ Hex string contains invalid characters.");
}

// Convert and decode
const dummyResponse = Buffer.from(dummyResponseHex, "hex");
console.log("🔍 Decoding...");
const decoded = decodeResult(dummyResponse, "uint256");
console.log("✅ Decoded result:", decoded.toString()); // should print 3000
