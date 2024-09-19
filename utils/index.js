module.exports = {
    parseHistoricalData(historicalData) {
        return historicalData.map((row) => {
            return {
                startTime: new Date(row[0]),
                endTime: new Date(row[6]),
                open: parseFloat(row[1]),
                close: parseFloat(row[4]),
                difference: parseFloat(row[4]) - parseFloat(row[1]),
                high: parseFloat(row[2]),
                low: parseFloat(row[3]),
            }
        })
    }
}