const RealEstate = require('../models/RealEstate');

const getAll = () => RealEstate.find({}).lean();

const getOne = (id) => RealEstate.findById(id).lean();

const realEstateService = {
    getAll,
    getOne,
};

module.exports = realEstateService;
