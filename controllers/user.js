const { response, request } = require("express");
const { compareSync, genSaltSync, hashSync } = require("bcryptjs");
const createJWT = require("../auth/JWT");
const User = require("../models/user");
const { transporter } = require("../helpers/mailer.config");

const getUsers = async (req = request, res = response) => {
  const users = await User.find();
  res.json({
    users,
  });
};

const createUser = async (req = request, res = response) => {
  try {
    let user = new User(req.body);

    const salt = genSaltSync();

    user.password = hashSync(user.password, salt);

    await user.save();
    
    const token = await createJWT(user);

    transporter.sendMail({
      from: '<jonayker.rozo@inacapmail.cl>',
      to: user.email,
      subject: "Bienvenido a Odontofeliz!!",
      html: `
        <h1>Estimado ${user.name}, bienvenido a nuestra plataforma 👻<h1>
      `,
    });

    return res.status(201).json({
      msg: "Usuario creado con exito",
      uid: user.id,
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      cod: 500,
      msg: "Ocurrio un error inesperado",
    });
  }
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;

  const { password, ...user } = req.body;

  if (password) {
    const salt = genSaltSync();
    user.password = hashSync(user.password, salt);
  }

  await User.findByIdAndUpdate(id, user);

  res.json({
    msg: `Usuario con id ${id} actualizado correctamente`,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(id, {isActive: false});

  res.json({
    msg: `Usuario con id ${id} desactivado`,
  });
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "El usuario no existe con ese email",
      });
    }

    const validPassword = compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Password incorrecto",
      });
    }

    const token = await createJWT(user);

    res.json({
      uid: user.id,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      cod: 500,
      msg: "Ocurrio un error inesperado",
    });
  }
};

const refreshToken = async (req = request, res = response) => {
  const { id, name, lastname, email, phone, rut, rol } = req.body.payload;

  const token = await createJWT({
    id,
    name,
    lastname,
    email,
    phone,
    rut,
    rol,
  });

  return res.json({
    token,
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  refreshToken,
};
