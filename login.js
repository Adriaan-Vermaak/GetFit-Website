const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ilikebirdsalot#499',
    database: 'Website_App'
});

// Function to authenticate user
function authenticateUser(username, password, callback) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (err, rows) => {
        if (err) {
            return callback(err);
        }
        if (rows.length === 0) {
            // User not found
            return callback(null, false);
        }
        const user = rows[0];
        // Compare hashed password with input password
        bcrypt.compare(password, user.password, (bcryptErr, result) => {
            if (bcryptErr) {
                return callback(bcryptErr);
            }
            if (result) {
                // Passwords match
                return callback(null, true, user);
                
            } else {
                // Passwords don't match
                return callback(null, false);
            }
        });
    });
}

// Example usage
module.exports = authenticateUser;
