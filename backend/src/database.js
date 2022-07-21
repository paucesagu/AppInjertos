const mysql = require('promise-mysql');
const {database} = require('./keys');
//existe create connection pero pool es mas cercano a un entorno de produccion. Tiene una especie de hilos que se ejecutan
const db = mysql.createPool(database);

const getConnection = () => {
    return db;
};

module.exports = {
    getConnection
};
