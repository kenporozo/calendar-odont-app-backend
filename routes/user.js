const { Router } = require("express");
const { check } = require("express-validator");
const { validation, hasRoles } = require("../middlewares/validations");
const { login, createUser, refreshToken, updateUser, getUsers, deleteUser } = require("../controllers/user");
const { validateToken } = require("../middlewares/validateJWT");
const { isRoleValid, existUserByRut, existUserByEmail, existUserById } = require("../helpers/db-validators");

const router = Router();

router.get("/users", getUsers)

router.post("/users", [
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
    .custom(existUserByRut)
    .bail(),
    check("email")
    .isEmail()
    .withMessage("Email incorrecto")
    .bail()
    .custom(existUserByEmail)
    .bail(),
    check("password")
    .notEmpty()
    .withMessage("La password es obligatoria")
    .bail(),
    check("phone")
    .notEmpty()
    .withMessage("El telefono es obligatorio")
    .bail(),
    check("role")
    .custom(isRoleValid)
    .bail(),
    validation
], createUser)

router.put('/users/:id', [
    check("id")
    .isMongoId()
    .withMessage("ID no valido")
    .bail()
    .custom(existUserById)
    .bail(),
    check("email")
    .custom(existUserByEmail)
    .bail(),
    check("rut")
    .custom(existUserByRut)
    .bail(),
    validateToken,
    validation
], updateUser);

router.delete("/users/:id", [
    check("id")
    .isMongoId()
    .withMessage("ID no valido")
    .bail()
    .custom(existUserById)
    .bail(),
    validateToken,
    hasRoles("ADMIN_ROLE"),
    validation
], deleteUser)

router.post("/auth/login", [
    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Email incorrecto")
    .bail(),
    check("password")
    .notEmpty()
    .withMessage("La password es obligatoria")
    .bail(),
    validation
], login)

router.get("/auth/refresh-token", validateToken, refreshToken)

module.exports = router;