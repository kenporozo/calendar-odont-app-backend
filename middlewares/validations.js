const { validationResult } = require("express-validator");
const moment = require('moment');

const validation = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let output = {
        cod : 400,
        msg : errors.errors[0].msg
    }
    console.log(output)
    return res.status(400).json(output);
  }
  next();
};

const hasRoles = (...roles) => {
  return (req, res, next) =>{
    if(!roles.includes(req.body.payload.role)){
      return res.status(401).json({
        cod: 401,
        msg: "Usuario no tiene privilegios suficientes"
      });
    }
    next();
  }
}

const isValidDate = (value) => {
  if (!value) {
      return false;
  }

  const date = moment(value);
  if (date.isValid()) {
      return true;
  } else {
      return false;
  }
  
}

module.exports = {
    validation,
    hasRoles,
    isValidDate
};
