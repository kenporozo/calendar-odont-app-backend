const { Router } = require("express");
const { check } = require("express-validator");
const { validation, hasRoles } = require("../middlewares/validations");
const { validateToken } = require("../middlewares/validateJWT");
const { getDentists, insertDentist, updateDentist, deleteDentist } = require("../controllers/dentist");
const { existDentistByRut, existDentistById } = require("../helpers/db-validators");

const router = Router();

router.get("/dentists", getDentists)

router.post("/dentists", [
    check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail(),
    check("lastname")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail(),
    check("rut")
    .notEmpty()
    .withMessage("El rut es obligatorio")
    .bail()
    .custom(existDentistByRut)
    .bail(),
    check("phone")
    .notEmpty()
    .withMessage("El telefono es obligatorio")
    .bail(),
    validateToken,
    hasRoles("ADMIN_ROLE"),
    validation
], insertDentist)

router.put('/dentists/:id', [
    check("id")
    .isMongoId()
    .withMessage("ID no valido")
    .bail()
    .custom(existDentistById)
    .bail(),
    check("rut")
    .custom(existDentistByRut)
    .bail(),
    validateToken,
    hasRoles("ADMIN_ROLE"),
    validation
], updateDentist);

router.delete("/dentists/:id", [
    check("id")
    .isMongoId()
    .withMessage("ID no valido")
    .bail()
    .custom(existDentistById)
    .bail(),
    validateToken,
    hasRoles("ADMIN_ROLE"),
    validation
], deleteDentist);

module.exports = router;