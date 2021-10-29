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

const addTenant = async (realId, tenantId) => {

    
    return await RealEstate.findOneAndUpdate({_id: realId}, 
        { 
            $push: {tenants: tenantId}, 
            $inc:{ piecesAvailable: -1}
        },
        { runValidators: true });
        
        // let realEstate = await realEstateService.getOne(req.params.realId);
        
        // realEstate.tenants.push(req.user._id);
        
        // await realEstate.save();
    };
    
const search = (text) => RealEstate.find( { type: {$regex: text, $options: 'i'}} ).lean();

const realEstateService = {
    getAll,
    getOne,
    create,
    getTopRealEstates,
    deleteOne,
    updateOne,
    addTenant,
    search
};

module.exports = realEstateService;
