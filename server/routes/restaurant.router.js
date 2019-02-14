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
    pool.query(`INSERT INTO "restaurants" ("name", "type", "rating") 
    VALUES ( $1, $2, $3 );`, [req.body.name, req.body.type, req.body.rating])
        .then( () => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error with restaurants query', error);
            res.sendStatus(500);
        });
});

// DELETE route to /restaurants
// add wildcard :taco
router.delete('/:id', (req, res) => {
    console.log('delete request was hit');
    console.log('req.params', req.params); // object with one property
    
    // query insert into restaurants
    pool.query(`DELETE FROM "restaurants"
                WHERE "id" = $1;`, [req.params.id])
        .then( () => {
            res.sendStatus(204);
        }).catch( (error) => {
            console.log('error with restaurant delete query', error);
            res.sendStatus(500);
        });
});

module.exports = router;