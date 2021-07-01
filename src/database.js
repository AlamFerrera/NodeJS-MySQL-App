const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');
const pool = mysql.createPool(database);

pool.getConnection((err, conn) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS MANY CONNECTION');
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(conn){
        conn.release();
        console.log("Conexion exitosa");
    }
    return;
});

//Convierte a promesas los callbacks
pool.query = promisify(pool.query);

module.exports = pool;