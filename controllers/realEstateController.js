const express = require('express');
const realEstateService = require('../services/realEstateService');

const router = express.Router();

const getCreateView = (req, res) => {
    res.render('rent/create');
}

const getHousingView = async (req, res) => {
    let realEstates = await realEstateService.getAll();
    res.render('rent/housing', { realEstates });
}

const getDetailsView = async(req, res) => {
    let realEstate = await realEstateService.getOne(req.params.realId);

    let isOwn = real.creator == req.user._id;
    res.render('real/details', { ...realEstate, isOwn});
}

router.get('/create', getCreateView);
router.get('/housing', getHousingView);
router.get('/:realId/details', getDetailsView);

module.exports = router;