const express = require('express');

const realEstatesService = require('../services/realEstateService');

const router = express.Router();

router.get('/', async(req, res) => {

    let realEstates = await realEstatesService.getAll();
    res.render('home', { realEstates });

});


module.exports = router;