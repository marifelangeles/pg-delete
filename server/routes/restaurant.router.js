// requires
const express = require('express');
const pool = require('../modules/pool');

// .Router creates a function like anonymous functions in get/post routes
// replace app with router
const router = express.Router();
// export routes below

// GET route to /restaurants
router.get('/', (req, res) => {
    console.log('GET /restaurants');
    // query select restaurant table 
    pool.query(`SELECT * FROM "restaurants";`)
        .then((results) => {
            console.log('back from select', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with restaurants query', error);
            res.sendStatus(500);
        });
});

// POST route to /restaurants
router.post('/', (req, res) => {
    console.log('sending via POST', req.body);
    // query insert into restaurants
    pool.query(`INSERT INTO "restaurants" ("name", "type") 
    VALUES ( $1, $2 );`, [req.body.name, req.body.type])
        .then(() => {
            console.log('back from insert');
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error with restaurants query', error);
            res.sendStatus(500);
        });
});

module.exports = router;