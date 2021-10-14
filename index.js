const express = require('express');
const path = require('path');
const routes = require('./routes');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const initDatabase = require('./config/database');

const app = express();
app.use(express.urlencoded({extended: true}));
require('./config/handlebars');

app.use(express.static(path.resolve(__dirname, './static')));
require('dotenv/config');
app.use(routes);

initDatabase(process.env.DB_CONNECTION)
    .then(() => {
        app.listen(config.PORT, () => console.log(`App running on port ${config.PORT}`));
        console.log('Connected to DB...');
    })
    .catch(error => {
        console.error.bind(console, `App init failed: ${error}`);
    })



