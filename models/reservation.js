const { Schema, model } = require('mongoose');

const UserSubSchema = Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
    }
});

UserSubSchema.methods.toJSON = function() {
    const {__v, _id, ...userSubSchema} = this.toObject();
    return userSubSchema;
}

const ReservationSchema = Schema({
    user: {
        type: UserSubSchema,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    dentist: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Dentist"
    }
});

ReservationSchema.methods.toJSON = function() {
    const {__v, user, ...reservation} = this.toObject();
    const {_id, ...cleanUser} = user;
    reservation.user = cleanUser;
    return reservation;
}

module.exports = model('Reservation', ReservationSchema);