const pg = require('pg');
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

module.exports = pool;