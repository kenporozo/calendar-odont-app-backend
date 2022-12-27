const e = require("express");
const { response, request } = require("express");
const Reservation = require("../models/reservation");
const User = require("../models/user");
const { transporter } = require("../helpers/mailer.config");

const getReservations = async (req = request, res = response) => {
  const reservations = await Reservation.find()
    .populate("dentist", "_id name lastname")
    .populate("user", "_id name lastname rut");

  res.json({
    reservations,
  });
};

const insertReservation = async (req = request, res = response) => {
  try {
    let reservation = new Reservation(req.body);
    let user;

    if (req.body.user) {
      user = await User.findById(req.body.user);
    } else {
      reservation.ip = req.ip;
    }

    await reservation.save();

    transporter.sendMail({
      from: "<jonayker.rozo@inacapmail.cl>",
      to: reservation.email || user.email,
      subject: "Notificacion de reserva!!",
      html: `
        <h1>Estimado ${
          reservation.name || user.name
        }, reserva creada con exito para el dia ${reservation.start} 👻<h1>
      `,
    });
    return res.status(201).json({
      msg: "Reserva creada con exito",
      uid: reservation.id,
      reservation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error inesperado",
    });
  }
};

const getReservationsByDentistId = async (req = request, res = response) => {
  const { dentistId } = req.params;

  const reservations = await Reservation.find({ dentist: dentistId })
    .populate("dentist", "_id name lastname")
    .populate("user", "_id name lastname rut");

  return res.json({
    reservations,
  });
};

const updateReservation = async (req = request, res = response) => {
  try {
    const { reservationId } = req.params;

    const { userId, ...reservation } = req.body;

    const reserve = await Reservation.findById(reservationId);

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
  try {
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
  deleteReservation,
  getReservationsByDentistId,
};
