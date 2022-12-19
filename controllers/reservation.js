const { response, request } = require("express");
const Reservation = require("../models/reservation");

const getReservations = async (req = request, res = response) => {
  const reservations = await Reservation.find();
  res.json({
    reservations
  });
};

const insertReservation = async (req = request, res = response) => {
  try {
    let reservation = new Reservation(req.body);

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
    const { id } = req.params;

    const { ...reservation } = req.body;

    await Reservation.findByIdAndUpdate(id, reservation);

    res.json({
      msg: `Reserva con id ${id} actualizada correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error inesperado",
    });
  }
};

const deleteReservation = async (req = request, res = response) => {
  const { id } = req.params;

  await Reservation.findByIdAndDelete(id);

  res.json({
    msg: `Reserva con id ${id} eliminada`,
  });
};

module.exports = {
    getReservations,
    insertReservation,
    updateReservation,
    deleteReservation
}