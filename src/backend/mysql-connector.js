const mysql = require('mysql');

const configMysql = {
    connectionLimit: 10,
    host: 'mysql-server',
    port: '3306',
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}

const pool = mysql.createPool(configMysql);

pool.getConnection((err, connection) => {
    if (err) {
        console.error(`Error al conectar a la base de datos: ${err.code}`);
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexión a la base de datos se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones.');
                break;
            case 'ECONNREFUSED':
                console.error('La conexión fue rechazada.');
                break;
            default:
                console.error('Error al conectar a la base de datos:', err);
                break;
        }
    }
    if (connection) connection.release();
    console.log('DB connection successful.');
});

module.exports = pool;
