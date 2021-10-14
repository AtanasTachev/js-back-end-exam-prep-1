const express = require('express');
const path = require('path');
const routes = require('./routes');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const initDatabase = require('./config/database');

const app = express();
app.use(express.urlencoded({extended: true}));
require('./config/handlebars')(app);

app.use(express.static(path.resolve(__dirname, './static')));

app.use(routes);

initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, console.log.bind(console, `App running on port ${config.PORT}`));
    })
    .catch(error => {
        console.log('App init failed: ', error);
    })



