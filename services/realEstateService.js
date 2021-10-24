const RealEstate = require('../models/RealEstate');

const getAll = () => RealEstate.find({}).lean();

const getOne = (id) => RealEstate.findById(id).populate('tenants');

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

const getTopRealEstates = () => RealEstate.find().sort({createdAt: -1}).limit(3).lean();

const deleteOne = (id) => RealEstate.findByIdAndDelete(id).lean();

const updateOne = (id, real) => RealEstate.findByIdAndUpdate(id, real).lean();

const realEstateService = {
    getAll,
    getOne,
    create,
    getTopRealEstates,
    deleteOne,
    updateOne
};

module.exports = realEstateService;
