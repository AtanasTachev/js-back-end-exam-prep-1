const express = require('express');

const homeController = require('./controllers/homeController');
const realEstateController = require('./controllers/realEstateController');
const authController = require('./controllers/authController');
const router = express.Router();

router.use(homeController);
router.use('/rent', realEstateController);
router.use(authController);

router.use('*', (req, res) => {
    res.status(404)
.render('404');
});
module.exports = router; 