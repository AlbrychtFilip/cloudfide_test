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
        const { error } = schema.validate(options);
        if (error) {
            console.error(error.message);
            process.exit(1);
        }
        const historicalData = await fetchHistoricalData(options.symbol, options.from, options.to, options.interval);

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