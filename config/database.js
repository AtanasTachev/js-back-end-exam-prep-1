const mongoose = require('mongoose');

const initDatabase = (connectionString) => {
    return mongoose.connect(connectionString);
};

module.exports = initDatabase;