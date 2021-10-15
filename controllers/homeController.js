const express = require('express');

const router = express.Router();

const home = (req, res) => {
    res.render('home');
}

const getCreateView = (req, res) => {
    res.render('create');
}

router.get('/', home);
router.get('/create', getCreateView)

module.exports = router;