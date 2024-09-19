const axios = require('axios');
const url = 'https://api.binance.com'
module.exports = {
    async fetchHistoricalData(symbol, startTime, endTime, interval) {
        const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
        return response.data;
    }
}