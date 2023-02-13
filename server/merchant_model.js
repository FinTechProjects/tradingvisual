const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  user: 'postgres', 
  port: 5432,
  password: ' ',
  database: 'postgres'
});

const addData = (body) => {
  return new Promise(function(resolve, reject) {
    const {candle, money} = body
    pool.query(`INSERT INTO public."BTCUSDT"(
      "time", close, open, high, low, money)
      VALUES (${candle.time},${candle.close},${candle.open},${candle.high},${candle.low},${money})`, (error, results) => {
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