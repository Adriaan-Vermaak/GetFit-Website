const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./dbConfig');

const app = express();
const PORT = 3000;
const wishlistItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the main directory

// Endpoint to handle login requests
app.post('/login', (req, res) => {
    console.log('Received request:', req.body);
    const { username, password } = req.body;

    console.log('Received login request for username:', username);
    console.log('Received login request for password:', password);

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (rows.length === 0) {
            console.log('Authentication failed for username:', username);
            return res.status(401).json({ error: 'Authentication failed' });
        }

        console.log('User authenticated:', username);
        res.redirect(`/dashboard?username=${encodeURIComponent(username)}`);
    });
});

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email]);
        return res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Database error' });
    }
});

app.post('/cart/add', (req, res) => {
    const productId = req.body.productId;

    console.log(`Adding product with ID ${productId} to cart`);

    res.status(200).json({ message: 'Product added to cart successfully!' });
});

app.get('/products', (req, res) => {
    console.log('Request received for /products');
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        console.log('Products retrieved from the database:', results);

        res.status(200).json(results);
    });
    console.log('Database query initiated');
});

app.get('/browsegear', (req, res) => {
    res.sendFile(path.join(__dirname, 'browsegear.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'Cart.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'Register.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
