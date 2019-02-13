// requires
const express = require('express');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');

// does not require pool

const restaurantRouter = require('./routes/restaurant.router');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser run before restaurantRouter

// for every route require restaurantRouter
app.use('/restaurants', restaurantRouter);

// server up
app.listen(PORT, () => {
    console.log(`running in ${PORT}`);
});










