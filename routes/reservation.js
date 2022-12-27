const { Router } = require("express");
const { check } = require("express-validator");
const { validation, isValidDate } = require("../middlewares/validations");
const { getReservations, insertReservation, updateReservation, deleteReservation, getReservationsByDentistId } = require("../controllers/reservation");
const { existDentistById, existReservationById, existReservationByDate } = require("../helpers/db-validators");

const router = Router();

router.get("/reservations", getReservations);

router.get("/reservations/:dentistId",[
    check("dentistId")
    .isMongoId()
    .withMessage("ID no valido")
    .bail(),
    validation
], getReservationsByDentistId);

router.post("/reservations", [
    check("user")
    .optional()
    .isMongoId()
    .withMessage("El usuario no tiene un id valido")
    .bail(),
    check("start")
    .custom(isValidDate)
    .withMessage("La fecha no es valida")
    .bail()
    .custom(existReservationByDate)
    .withMessage("La hora de reserva ya esta registrada")
    .bail(),
    check("end")
    .custom(isValidDate)
    .withMessage("La fecha no es valida")
    .bail(),
    check("dentist")
    .isMongoId()
    .withMessage("El id del dentista es obligatorio")
    .bail()
    .custom(existDentistById)
    .bail(),
    check("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail(),
    check("lastname")
    .optional()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail(),
    check("rut")
    .optional()
    .notEmpty()
    .withMessage("El rut es obligatorio")
    .bail(),
    check("email")
    .optional()
    .isEmail()
    .withMessage("Email incorrecto")
    .bail(),
    check("phone")
    .optional()
    .notEmpty()
    .withMessage("El telefono es obligatorio")
    .bail(),
    validation
], insertReservation)

router.put("/reservations/:reservationId", [
    check("reservationId")
    .isMongoId()
    .withMessage("ID no valido")
    .bail()
    .custom(existReservationById)
    .bail(),
    check("userId")
    .optional()
    .isMongoId()
    .withMessage("Id de usuario no valido")
    .bail(),
    validation
], updateReservation);

router.delete("/reservations/:reservationId", [
    check("reservationId")
    .isMongoId()
    .withMessage("ID no valido")
    .bail()
    .custom(existReservationById)
    .bail(),
    check("userId")
    .optional()
    .isMongoId()
    .withMessage("Id de usuario no valido")
    .bail(),
    validation
], deleteReservation);

module.exports = router;