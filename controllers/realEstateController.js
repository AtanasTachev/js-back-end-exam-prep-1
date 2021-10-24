const router = require('express').Router();
const realEstateService = require('../services/realEstateService');
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwnReal } = require('../middlewares/realEstateMiddleware');

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

    let realEstateData = await realEstate.toObject();

    let isOwner = realEstateData.owner == req.user?._id;  

    let tenants = realEstate.getTenants();
    
    let noVacancy = realEstate.piecesAvailable <= 0;
    
    let isRented = realEstate.tenants.some(x => x._id == req.user?._id);

    res.render('rent/details', { ...realEstateData, isOwner, tenants, noVacancy, isRented });
});

router.get('/:realId/edit', async (req, res) => {
    let realEstate = await realEstateService.getOne(req.params.realId);
    let realData = await realEstate.toObject();
    res.render('rent/edit', {...realData});
});

router.post('/:realId/edit', async(req, res) => {
    let realData = req.body;
    let realId = req.params.realId;
    await realEstateService.updateOne(realId, realData);
    res.redirect(`/rent/${req.params.realId}/details`);
});

router.get('/:realId/delete', async (req, res) => {
    await realEstateService.deleteOne(req.params.realId);
    res.redirect('/');
});

router.get('/:realId/rent', async (req, res) => {

    await realEstateService.addTenant(req.params.realId, req.user._id);

    res.redirect(`/rent/${req.params.realId}/details`);
});



module.exports = router;