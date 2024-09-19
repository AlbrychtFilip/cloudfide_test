# cloudfide_test

Service provides logic for analyzing historical data on Binance. To run it, you need to use command:
```
node index.js
```

This command allows to provide the following parameters:
- `--symbol` - symbol of the currency pair (e.g. BTCUSDT)
- `--interval` - interval of the candlestick (e.g. 1m, 5m, 15m, 1h, 1d)
- `--from` - start date of the data in ms
- `--to` - end date of the data in ms

Example of the command:
```
node index.js --symbol=BTCUSDT --interval=1m --from=1726763000000 --to=1726763192376
```

Project also contain unit tests for binance and utils logic. To run it, you need to use command:
```
npm test
```