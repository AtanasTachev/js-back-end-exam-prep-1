const mongoose = require('mongoose');

const realEstateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Apartment", "Villa", "House"],
        required: true
    },
    year: {
        type:Number,
        required: true    
    },
    city: {
        type: String,
        required: true
    },
    homeImage: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    piecesAvailable: {
        type: Number,
        required: true
    },
    tenants: [
        {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},
 { timestamps: true } );

realEstateSchema.method('getTenants', function(){
    return this.tenants.map(x => x.fullname).join(', ');
});


const RealEstate = mongoose.model('RealEstate', realEstateSchema);


module.exports = RealEstate;