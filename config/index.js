// To have access to the 'body' property in requests
const express = require('express');

// For the message in the terminal when requests are coming in
const logger = require('morgan');

// When we deal with cookie or authentication
const cookieParser = require ('cookie-parser');

// serves a custom favicon on each request
const favicon  = require ('serve-favicon');

// to normalize paths amongst different operating system
const path = require ('path');

// Middleware configuration
module.exports = (app) => {
    app.use(logger('dev'));

    // To have access to 'body' property in the request
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    // Normalizes the path to the views folder
    app.set('views', path.join(__dirname, "..", "views"));

    // Sets the view engine to handlebars
    app.set("view engine", "hbs");

    // Handles access to the public folder
    app.use(express.static(path.join(__dirname, "..", "public")));

    // Handles access to the favicon
    app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));
};