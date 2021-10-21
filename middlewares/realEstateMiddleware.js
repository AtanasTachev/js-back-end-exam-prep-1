const realEstateService = require('../services/realEstateService');

exports.isOwnReal = (req, res, next) => {
    let real = realEstateService.getOne(req.params.realId);

    if(real.owner == req.user._id) {
        req.real = real;
        next();
    } else {
        next('You are not allowed to edit or delete this real-estate');
    }
}