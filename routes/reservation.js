const { Router } = require("express");
const { check } = require("express-validator");
const { validation, isValidDate } = require("../middlewares/validations");
const { getReservations, insertReservation, updateReservation, deleteReservation } = require("../controllers/reservation");
const { existDentistById, existReservationById } = require("../helpers/db-validators");

const router = Router();

router.get("/reservations", getReservations);

router.post("/reservations", [
    check("user")
    .notEmpty()
    .withMessage("El usuario asociado es obligatorio")
    .bail(),
    check("start")
    .custom(isValidDate)
    .withMessage("La fecha no es valida")
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
    validation
], insertReservation)

router.put("/reservations/:id", [
    check("id")
    .isMongoId()
    .withMessage("ID no valido")
    .bail()
    .custom(existReservationById)
    .bail(),
    validation
], updateReservation);

router.delete("/reservations/:id", [
    check("id")
    .isMongoId()
    .withMessage("ID no valido")
    .bail()
    .custom(existReservationById)
    .bail(),
    validation
], deleteReservation);

module.exports = router;