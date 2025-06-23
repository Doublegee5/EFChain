const { buildRequestCBOR, decodeResult } = require('@chainlink/functions-toolkit');
const config = require('./functions-request-config');

async function main() {
  const { source, secrets, args } = config;

  const requestConfig = {
    codeLocation: config.codeLocation,
    codeLanguage: config.codeLanguage,
    source,
    secrets,
    args,
  };

  // ✅ Encode the user request
  const cborPayload = await buildRequestCBOR(requestConfig);
  console.log('📦 Encoded CBOR payload:', cborPayload.toString('hex'));

  // ✅ 3000 in uint256 (32 bytes = 64 hex chars)
  const dummyResponse = Buffer.from(
    "0000000000000000000000000000000000000000000000000000000000000bb8",
    "hex"
  );

  // ✅ Decode the dummy Chainlink oracle response
  const decoded = decodeResult(dummyResponse, config.expectedReturnType);
  console.log('🔍 Decoded simulated result:', decoded.toString());
}

main().catch(console.error);
