const mongoose = require('mongoose');
const { DB_CONNECTION } = require('../constants');

exports.initDatabase = function () {
    return mongoose.connect(DB_CONNECTION);
};;