module.exports = {
  codeLocation: 0, // Inline code
  codeLanguage: 0, // JavaScript
  source: `
    // Chainlink Functions Request Source Code
    const response = await Functions.makeHttpRequest({
      url: "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
    });
    if (response.error) {
      throw Error("Request failed");
    }
    return Functions.encodeUint256(Math.round(response.data.bpi.USD.rate_float * 100));
  `,
  secrets: {},
  args: [],
  expectedReturnType: "uint256",
};
