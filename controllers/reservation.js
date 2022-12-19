const { response, request } = require("express");
const Reservation = require("../models/reservation");

const getReservations = async (req = request, res = response) => {

  console.log(req.ip);
  const reservations = await Reservation.find()
    .populate("dentist", "_id name lastname")
    .populate("user", "_id name lastname");

  res.json({
    reservations
  });
};

const insertReservation = async (req = request, res = response) => {
  try {
    let reservation = new Reservation(req.body);

    if(!req.body.user){
      reservation.ip = req.ip;
    }

    await reservation.save();

    return res.status(201).json({
      msg: "Reserva creada con exito",
      uid: reservation.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error inesperado",
    });
  }
};

const updateReservation = async (req = request, res = response) => {
  try {
    const { reservationId } = req.params;

    const { userId, ...reservation } = req.body;

    const reserve = await Reservation.findById(reservationId);

    if(userId){
      if(reserve.user.toString() !== userId){
        return res.status(401).json({
          msg: "Privilegios insuficientes (User id distinto)"
        });
      }
    }else{
      if(reserve.ip !== req.ip){
        return res.status(401).json({
          msg: "Privilegios insuficientes (Ip disintinta)"
        });
      }
    }

    await Reservation.findByIdAndUpdate(reservationId, reservation);

    res.json({
      msg: `Reserva con id ${reservationId} actualizada correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error inesperado",
    });
  }
};

const deleteReservation = async (req = request, res = response) => {
  const { reservationId } = req.params;
  const { userId } = req.query; 
  try {
    const reserve = await Reservation.findById(reservationId);

    console.log(reserve);

    if(userId){
      if(reserve.user.toString() !== userId){
        return res.status(401).json({
          msg: "Privilegios insuficientes (User id distinto)"
        });
      }
    }else{
      if(reserve.ip !== req.ip){
        return res.status(401).json({
          msg: "Privilegios insuficientes (Ip disintinta)"
        });
      }
    }
  
    await Reservation.findByIdAndDelete(reservationId);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error inesperado",
    });
  }

  res.json({
    msg: `Reserva con id ${reservationId} eliminada`,
  });
};

module.exports = {
    getReservations,
    insertReservation,
    updateReservation,
    deleteReservation
}