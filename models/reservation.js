const { Schema, model } = require('mongoose');

const ReservationSchema = Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dentist: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Dentist"
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    rut: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    ip: {
        type: String
    }
});

ReservationSchema.methods.toJSON = function() {
    const {__v, ...reservation} = this.toObject();
    return reservation;
}

module.exports = model('Reservation', ReservationSchema);