// requires
let express = require('express');
let app = express();
let PORT = 5000;
const pg = require('pg');
let bodyParser = require('body-parser');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// server up
app.listen(PORT, () => {
    console.log(`running in ${PORT}`);
});

// connect to database
const pool = pg.Pool({
    // where database is
    host: 'localhost',
    // what port? not 5000 --> 5432 most common for postgres
    port: 5432,
    // name of database
    database: 'bookstore',
    // number of connection in pool; 10 max in heroku
    max: 10,
    // 30 sec to try to connect or cancel query
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('error', (error) => {
    console.log('error with postgres pool', error);
});

// routes

// GET /restaurants
app.get('/restaurants', (req, res) => {
    console.log('GET /restaurants');
    res.sendStatus(200);
});