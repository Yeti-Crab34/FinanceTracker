const { Pool } = require('pg');
// Yeti's database
const PG_URI = 'postgres://epbmcpmv:yAl2faE8bm-ezit21M-DOFoTHcT-rtCd@heffalump.db.elephantsql.com/epbmcpmv'
// const PG_PW = 'yAl2faE8bm-ezit21M-DOFoTHcT-rtCd'

// new database
// const PG_URI = 'postgres://lnjbcpuy:2SlAcmsZbKXZP-dfyTBfERDgECg_JY32@rosie.db.elephantsql.com/lnjbcpuy'
// db ps = 2SlAcmsZbKXZP-dfyTBfERDgECg_JY32

require('dotenv').config()

const pool = new Pool ({
    // connectionString: process.env.PG_URI,
    connectionString: PG_URI
});




module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text,params, callback);
    },
    //insert schema here;
}