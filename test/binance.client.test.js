const axios = require("axios");
const MockAdapter = require('axios-mock-adapter');
const assert = require('assert');
const {fetchHistoricalData} = require("../clients/binance");

describe('Binance analytics', () => {
  let stub;
  const receivedData = [
    [
      1499040000000,      // Kline open time
      "0.01634790",       // Open price
      "0.80000000",       // High price
      "0.01575800",       // Low price
      "0.01577100",       // Close price
      "148976.11427815",  // Volume
      1499644799999,      // Kline Close time
      "2434.19055334",    // Quote asset volume
      308,                // Number of trades
      "1756.87402397",    // Taker buy base asset volume
      "28.46694368",      // Taker buy quote asset volume
      "0"                 // Unused field, ignore.
    ]
  ];

  before(() => {
    stub = new MockAdapter(axios);
    stub.onGet().replyOnce(200, receivedData);
  });
  it('should return return array with details about historical data', async () => {
    const result = await fetchHistoricalData('BTCUSDT', 1499040000000, 1499644799999, '1d');
    assert.deepEqual(result, receivedData)
  });
})