const express = require('express');

const router = express.Router();

const getCreateView = (req, res) => {
    res.render('rent/create');
}

const getHousingView = (req, res) => {
    res.render('rent/housing');
}

const getDetailsView = (req, res) => {
    res.render('rent/:appId/details')
}

router.get('/create', getCreateView);
router.get('/housing', getHousingView);
router.get('/:appId', getDetailsView);

module.exports = router;