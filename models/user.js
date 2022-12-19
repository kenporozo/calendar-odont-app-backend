const { Schema, model } = require('mongoose');

const UserSchema = Schema({
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);