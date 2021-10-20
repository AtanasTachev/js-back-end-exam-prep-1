const realEstateController = require('../services/realEstateService');

exports.isOwnReal = (req, res, next) => {
    let real = realEstateService.getOne(req.params.realId);

    if(real.owner == req.user._id) {
        req.real = real;
        next();
    } else {
        next('Uou are not allowed to edit or delete this real-estate');
    }
}