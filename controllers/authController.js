const express = require('express');

const router = express.Router();

const renderLoginView = (req, res) => {
    res.render('auth/login');
}

const renderRegisterView = (req, res) => {
    res.render('auth/register');
}

router.get('/login', renderLoginView);
router.get('/register', renderRegisterView);

module.exports = router;
