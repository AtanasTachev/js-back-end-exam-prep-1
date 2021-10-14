const mongoose = require('mongoose');

const initDataBase = (connectionString) => {
    return mongoose.connect(connectionString);
};

module.exports = initDataBase;