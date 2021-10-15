const User = require('../models/User');
const { jwtSign } = require('../utils/jwt');
const { SECRET } = require('../constants');

exports.register = function (fullname, username, password, repass) {
    return User.create({ fullname, username, password, repass })
};

exports.login = function (username, password) {
    return User.findByUsername(username)
        .then(user => Promise.all([user.validatePassword(password), user]))
        .then(([isValid, user]) => {
            if (isValid) {
                return user;
            } else {
                throw { message: 'Invalid username or password' }
            }
        })
        .catch(() => null);
}

exports.createToken = function(user) {
    let payload = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname
    }

    return jwtSign(payload, SECRET);
};