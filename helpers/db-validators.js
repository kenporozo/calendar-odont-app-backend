const Role = require("../models/role")
const User = require("../models/user");
const Dentist = require("../models/dentist");
const Reservation = require("../models/reservation");

const isRoleValid = async (role = "") => {
    
    const existRole = await Role.findOne({role});

    if(!existRole){
        throw new Error(`El rol ${role} no es valido`);
    }
}

const existUserByEmail = async (email = '') =>{
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`El email ${email} ya esta registrado`);
    }
}

const existUserByRut = async (rut = '') =>{
    const existRut = await User.findOne({rut});
    if(existRut){
        throw new Error(`El rut ${rut} ya esta registrado`);
    }
}

const existUserById = async (id) =>{
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`El usuario con id ${id} no existe`);
    }
}

const existDentistByRut = async (rut = '') =>{
    const existDentistByRut = await Dentist.findOne({rut});
    if(existDentistByRut){
        throw new Error(`El dentista con el rut ${rut} ya esta registrado`);
    }
}

const existDentistById = async (id) =>{
    const existDentistById = await Dentist.findById(id);
    if(!existDentistById){
        throw new Error(`El dentista con id ${id} no existe`);
    }
}

const existReservationById = async (id) =>{
    const existReservationById = await Reservation.findById(id);
    if(!existReservationById){
        throw new Error(`La reserva con id ${id} no existe`);
    }
}

const existReservationByDate = async (start = '', dentist = 'f') =>{
    console.log("start" , new Date(start));
    console.log("dentist" , dentist.req.body.dentist);
    const existReservationByDate = await Reservation.findOne({start: new Date(start), dentist: dentist.req.body.dentist});
    if(existReservationByDate){
        throw new Error(`La hora ${start} ya esta tomada`);
    }
}


module.exports = {
    isRoleValid,
    existUserByEmail,
    existUserByRut,
    existUserById,
    existDentistByRut,
    existDentistById,
    existReservationById,
    existReservationByDate
}