const axios = require('axios');
const url = 'https://api.binance.com';
module.exports = {
    async fetchHistoricalData(symbol, startTime, endTime, interval) {
        try {
            const response = await axios.get(`${url}/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}