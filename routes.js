const express = require('express');

const homeController = require('./controllers/homeController');
const apartmentController = require('./controllers/apartmentController');
const authController = require('./controllers/authController');
const router = express.Router();

router.use(homeController);
router.use('/rent', apartmentController);
router.use('/auth', authController);

router.use('*', (req, res) => {
    res.status(404)
.render('404');
});
module.exports = router; 