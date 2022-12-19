const { Schema, model } = require('mongoose');

const DentistSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    }
})

DentistSchema.methods.toJSON = function() {
    const {__v, ...dentist} = this.toObject();
    return dentist;
}


module.exports = model('Dentist', DentistSchema);