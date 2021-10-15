const express = require('express');

const router = express.Router();

const getCreateView = (req, res) => {
    res.render('rent/create');
}

router.get('/create', getCreateView)

module.exports = router;