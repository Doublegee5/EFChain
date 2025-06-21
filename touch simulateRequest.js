const { simulateRequest } = require("@chainlink/functions-toolkit");
const config = require("./functions-request-config");

async function main() {
  const { responseBytesHexstring, response, errorString } = await simulateRequest(config);
  console.log("Simulated response:", response);
  console.log("Hexstring:", responseBytesHexstring);
  if (errorString) {
    console.error("Simulation error:", errorString);
  }
}

main().catch(console.error);
