const handlebars = require('handlebars');
const path = require('path');

exports.initHandlebars = (app) => {
    app.set('views', path.resolve(__dirname, '../views'));
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
};