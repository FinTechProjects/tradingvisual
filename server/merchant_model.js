const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    user: 'advait', 
    port: 3001,
    password: ' ',
    database: 'advait'
});

const addData = (body) => {
  return new Promise(function(resolve, reject) {
    const {candle, money} = body
    pool.query(`INSERT INTO public.candles(time, close, open, high, low, money) VALUES (${candle.time},${candle.close},${candle.open},${candle.high},${candle.low},${money})`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  })
}
  
  module.exports = {
    addData
  }