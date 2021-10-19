const router = require('express').Router();

const homeController = require('./controllers/homeController');
const realEstateController = require('./controllers/realEstateController');
const authController = require('./controllers/authController');

router.use(homeController);
router.use('/rent', realEstateController);
router.use(authController);

router.use('*', (req, res) => {
    res.status(404)
.render('404');
});
module.exports = router; 