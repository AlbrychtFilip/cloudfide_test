const { Command } = require('commander');

const program = new Command();

program
    .name('binance-analyze')
    .description('Command responsible for fetch historical data and analyze it')
    .version('1.0.0')
    .option('-s, --symbol <symbol>', 'Cryptocurrency symbol', 'BTCUSDT')
    .option('-st, --start-time <startTime>', 'Start time in milliseconds', (Date.now() - 86400000).toString())
    .option('-et, --end-time <endTime>', 'End time in milliseconds', Date.now().toString())
    .option('-i, --interval <interval>', 'Interval', '1m')
    .action(async (options) => {
        console.log('Symbol:', options)
    })

program.parse(process.argv);