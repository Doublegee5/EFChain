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

  // Build the CBOR payload for the request
  const cborPayload = await buildRequestCBOR(requestConfig);
  console.log('📦 Encoded CBOR payload:', cborPayload.toString('hex'));

  // Simulate Chainlink oracle returning 3000 encoded as uint256
  const dummyResponse = Buffer.from("0000000000000000000000000000000000000000000000000000000000000bb8", "hex");
  const decoded = decodeResult(dummyResponse, config.expectedReturnType);

  console.log('🔍 Decoded simulated result:', decoded.toString());
}

main().catch(console.error);
