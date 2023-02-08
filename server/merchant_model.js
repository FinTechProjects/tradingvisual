const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    user: 'advait', 
    port: 3001,
    password: ' ',
    database: 'advait'
});

// const getMerchants = () => {
//     return new Promise(function(resolve, reject) {
//       pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
//         if (error) {
//           reject(error)
//         }
//         resolve(results.rows);
//       })
//     }) 
//   }

const addData = (body) => {
  return new Promise(function(resolve, reject) {
    const {candle, money} = body
    pool.query(`INSERT INTO public.candles(time, close, open, high, low, money) VALUES (${candle.time},${candle.close},${candle.open},${candle.high},${candle.low},${money})`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}
  // const createMerchant = (body) => {
  //   return new Promise(function(resolve, reject) {
  //     const { name, email } = body
  //     pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
  //       if (error) {
  //         reject(error)
  //       }
  //       resolve(`A new merchant has been added added: ${results.rows[0]}`)
  //     })
  //   })
  // }
  // const deleteMerchant = () => {
  //   return new Promise(function(resolve, reject) {
  //     const id = parseInt(request.params.id)
  //     pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
  //       if (error) {
  //         reject(error)
  //       }
  //       resolve(`Merchant deleted with ID: ${id}`)
  //     })
  //   })
  // }
  
  module.exports = {
    addData
  }