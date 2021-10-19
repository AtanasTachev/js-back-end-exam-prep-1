const RealEstate = require('../models/RealEstate');

const getAll = () => RealEstate.find({}).lean();

const getOne = (id) => RealEstate.findById(id).lean();

const create = (name, type, year, city, homeImage, description, piecesAvailable, userId) => {
    let realEstate = new RealEstate({
        name,
        type,
        year,
        city,
        homeImage,
        description,
        piecesAvailable,
        owner: userId
    });

    return realEstate.save();
}

const realEstateService = {
    getAll,
    getOne,
    create
};

module.exports = realEstateService;
