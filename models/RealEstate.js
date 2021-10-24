const mongoose = require('mongoose');

const realEstateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6
    },
    type: {
        type: String,
        enum: ["Apartment", "Villa", "House"],
        required: true
    },
    year: {
        type:Number,
        required: true,
        min: 1850,
        max: 2021    
    },
    city: {
        type: String,
        required: true,
        minlength: 4
    },
    homeImage: {
        type: String,
        required: true,
        validate: [/^https:?\/\//i, 'The home image should start with http or https!']
    },
    description: {
        type:String,
        required: true,
        maxlength: 60
    },
    piecesAvailable: {
        type: Number,
        required: true,
        min: 0,
        max: 10
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
 { timestamps: true });

realEstateSchema.method('getTenants', function(){
    return this.tenants.map(x => x.fullname).join(', ');
});


const RealEstate = mongoose.model('RealEstate', realEstateSchema);


module.exports = RealEstate;