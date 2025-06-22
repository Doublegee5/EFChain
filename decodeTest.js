console.log("🚀 Starting decode test...");

const { decodeResult } = require('@chainlink/functions-toolkit');

// ✅ This is 3000 encoded in uint256 format (32 bytes)
const dummyResponseHex = "0000000000000000000000000000000000000000000000000000000000000bb8";

try {
  const dummyResponse = Buffer.from(dummyResponseHex, "hex");
  console.log("🔧 Decoding...");
  const decoded = decodeResult(dummyResponse, "uint256");
  console.log("✅ Decoded result:", decoded.toString());
} catch (err) {
  console.error("❌ Error decoding:", err.message);
}
