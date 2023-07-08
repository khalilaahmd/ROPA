// Get access to environment variables and settings
require('dotenv/config');

// connects to database
require('./db');

// Handles http requests
const express= require('express');

// Handles the handlebars
const hbs = require('hbs');
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

const app = express();

// Handle config settings
require('./config')(app);
require('./config/session.config')(app)

//Handling routes
const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth.routes');
app.use('/auth', auth);

const homePage = require ('./routes/HomePage.routes');
app.use('/homepage', homePage);

const department = require('./routes/departments.routes');
app.use('/department', department);

const ropa = require('./routes/RoPA.routes')
app.use('/RoPA', ropa);

// to handle error
require('./error-handling')(app);

module.exports = app;
