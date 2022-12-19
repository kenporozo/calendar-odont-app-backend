const { response, request } = require("express");
const Dentist = require("../models/dentist");

const getDentists = async (req = request, res = response) => {
  const dentists = await Dentist.find();
  res.json({
    dentists,
  });
};

const insertDentist = async (req = request, res = response) => {
  try {
    let dentist = new Dentist(req.body);

    await dentist.save();

    return res.status(201).json({
      msg: "Dentista creado con exito",
      uid: dentist.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error inesperado",
    });
  }
};

const updateDentist = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const { ...dentist } = req.body;

    await Dentist.findByIdAndUpdate(id, dentist);

    res.json({
      msg: `Dentista con id ${id} actualizado correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error inesperado",
    });
  }
};

const deleteDentist = async (req = request, res = response) => {
  const { id } = req.params;

  await Dentist.findByIdAndUpdate(id, { isActive: false });

  res.json({
    msg: `Dentista con id ${id} desactivado`,
  });
};

module.exports = {
    getDentists,
    insertDentist,
    updateDentist,
    deleteDentist
}