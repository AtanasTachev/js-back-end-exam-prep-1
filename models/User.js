const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT = 10;

const userSchema = new mongoose.Schema ({
    fullname: {
        type: String,
        required: true,
        validate: [/[A-Za-z]+ [A-Za-z]+/, 'Fullname should consist of first and last name starting with capital a letter']
    },
    username: {
        type: String,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
})

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT)
    .then(hash => {
        this.password = hash;
        next();
    });
});

userSchema.static('findByUsername', function(username) {
    return this.findOne({username});
});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;