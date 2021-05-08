'use strict';

const express = require('express');
const app = express();

const errorHandler404 = require('./error-handlers/404.js');
const errorHandler500 = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');

app.use(logger);
app.use(express.json());

app.use(foodRouter);
app.use(clothesRouter);


function listen(port) {
    app.listen(port, ()=>console.log(`Hello from ${port}`) )
}
module.exports = {
    app,
    listen
}

app.use('*', errorHandler404);
app.use(errorHandler500);