const handlebars = require('express-handlebars');
const express = require('express');
const path = require('path');

const initHandlebars = (app) => {
    app.set('views', path.resolve(__dirname, '../views'));
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.use(express.static('./static'));
    // app.use(express.json());
};

module.exports = initHandlebars;