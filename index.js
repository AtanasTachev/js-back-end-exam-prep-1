const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const { initDatabase } = require('./config/database');
const { auth, isAuth } = require('./middlewares/authMiddleware');

// const { isOwnReal } = require('./middlewares/realEstateMiddleware');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(auth);

require('./config/handlebars')(app);
app.use(routes);

initDatabase()
    .then( () => {
        // console.log(config.port);
        app.listen(config.port, () => console.log(`App running on port http://localhost:${config.port}`));
        console.log('Connected to DB...');
    })
    .catch(error => {
        console.error.bind(console, `App init failed: ${error}`);
    })



