const express = require('express');
const realEstateService = require('../services/realEstateService');
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwnReal } = require('../middlewares/realEstateMiddleware');

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('rent/create');
});


router.post('/create', isAuth, async (req, res) => {

    let {name, type, year, city, homeImage, description, piecesAvailable} = req.body;
    try{
        await realEstateService.create(name, type, year, city, homeImage, description, piecesAvailable, req.user._id);
        
        res.redirect('/');
    } catch(err) {
        // let errors = Object.keys(err.errors).map(x => err.errors[x].message);
        // res.locals.errors = errors;
        console.log(err.message);
        res.redirect('create');
    }
});

router.get('/housing', async (req, res) => {
    let realEstates = await realEstateService.getAll();
    res.render('rent/housing', { realEstates });
});

router.get('/:realId/details', async(req, res) => {
    let realEstate = await realEstateService.getOne(req.params.realId);

    // let isOwner = realEstate.owner == req.user._id;
    res.render('rent/details', { ...realEstate, isOwnReal, isAuth});
});

module.exports = router;