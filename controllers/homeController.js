const router = require('express').Router();

const realEstateService = require('../services/realEstateService');

router.get('/', async(req, res) => {

    let realEstates = await realEstateService.getTopRealEstates();
    res.render('home', { realEstates });

});

router.get('/search', async (req, res) => {
    // console.log(req.query.text);
    let realEstates = await realEstateService.search(req.query.text);
    res.render('search', {realEstates});
});

module.exports = router;