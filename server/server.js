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
    host: 'localhost',
    port: 5432,
    database: 'restaurants',  // use snake_case
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('error', (error) => {
    console.log('error with postgres pool', error);
});

// routes

// GET route to /restaurants
app.get('/restaurants', (req, res) => {
    console.log('GET /restaurants');
    // query select restaurant table 
    pool.query(`SELECT * FROM "restaurants";`)
        .then( (results) => {     
            console.log('back from select', results.rows);
            res.send(results.rows);
        }).catch( (error) => {
            console.log('error with restaurants query', error);
            res.sendStatus(500);
        });
});

// POST route to /restaurants
app.post('/restaurants', (req, res) => {
    console.log('sending via POST', req.body);
    // query insert into restaurants
    pool.query(`INSERT INTO "restaurants" ("name", "type") 
    VALUES ( $1, $2 );`, [req.body.name, req.body.type])
            .then( () => {
                console.log('back from insert');
                res.sendStatus(200);
            }).catch( (error) => {
                console.log('error with restaurants query', error);
                res.sendStatus(500);
            });
});



