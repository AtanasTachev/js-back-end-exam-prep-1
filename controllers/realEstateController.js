const express = require('express');
const realEstateService = require('../services/realEstateService');
const { isAuth } = require('../middlewares/authMiddleware')

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

    let isOwn = realEstate.creator == req.user._id;
    res.render('rent/details', { ...realEstate, isOwn});
}

const createRealEstate = async (req, res) => {
    let {name, type, year, city, homeImage, propertyDescription, piecesAvailable} = req.body;
    console.log(req.body);
    try{
        let rentedBy = [];
        let data = {name, type, year, city, homeImage, propertyDescription, piecesAvailable}
        await realEstateService.create(...data, rentedBy, req.user._id);

        res.redirect('/');
    } catch(err) {
        let errors = Object.keys(err.errors).map(x => err.errors[x].message);
        res.locals.errors = errors;

        res.redirect('rent/create');
    }
}

router.get('/create', getCreateView);
router.post('/create', isAuth, createRealEstate);
router.get('/housing', getHousingView);
router.get('/:realId/details', getDetailsView);

module.exports = router;