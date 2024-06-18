const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ilikebirdsalot#499',
    database: 'website_app'
});

module.exports = connection;