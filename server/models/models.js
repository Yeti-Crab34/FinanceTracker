const { Pool } = require('pg');
const PG_URI = 'postgres://epbmcpmv:yAl2faE8bm-ezit21M-DOFoTHcT-rtCd@heffalump.db.elephantsql.com/epbmcpmv'
// const PG_PW = 'yAl2faE8bm-ezit21M-DOFoTHcT-rtCd'
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