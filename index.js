const { Command } = require('commander');
const { fetchHistoricalData } = require('./clients/binance');
const Joi = require('joi');
const program = new Command();

const schema = Joi.object({
    symbol: Joi.string().required(),
    from: Joi.string().pattern(/^[0-9]+$/).required(),
    to: Joi.string().pattern(/^[0-9]+$/).required(),
    interval: Joi.string().valid('1s', '1m' ,'3m' ,'5m' ,'15m' ,'30m' ,'1h' ,'2h' ,'4h' ,'6h' ,'8h' ,'12h' ,'1d' ,'3d' ,'1w' ,'1M').required(),
})


program
    .name('binance-analyze')
    .description('Command responsible for fetch historical data and analyze it')
    .version('1.0.0')
    .option('-s, --symbol <symbol>', 'Cryptocurrency symbol', 'BTCUSDT')
    .option('-f, --from <startTime>', 'Start time in milliseconds', (Date.now() - 86400000).toString())
    .option('-t, --to <endTime>', 'End time in milliseconds', Date.now().toString())
    .option('-i, --interval <interval>', 'Interval', '1h')
    .action(async (options) => {
        console.log(options, 'asdbasjdasbjha')
        const { error } = schema.validate(options);
        if (error) {
            console.error(error.message);
            process.exit(1);
        }
        const historicalData = await fetchHistoricalData(options.symbol, options.from, options.to, options.interval);
        /**
         * [
         *   [
         *     1499040000000,      // Kline open time
         *     "0.01634790",       // Open price
         *     "0.80000000",       // High price
         *     "0.01575800",       // Low price
         *     "0.01577100",       // Close price
         *     "148976.11427815",  // Volume
         *     1499644799999,      // Kline Close time
         *     "2434.19055334",    // Quote asset volume
         *     308,                // Number of trades
         *     "1756.87402397",    // Taker buy base asset volume
         *     "28.46694368",      // Taker buy quote asset volume
         *     "0"                 // Unused field, ignore.
         *   ]
         * ]
         */

        const parse = historicalData.map((row) => {
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
        console.log(parse);
    })

program.parse(process.argv);