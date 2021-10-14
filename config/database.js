const mongoose = require('mongoose');

exports.initDataBase = (connectionString) => {
    return mongoose.connect(connectionString);
};