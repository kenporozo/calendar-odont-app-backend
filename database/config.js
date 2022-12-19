const mongoose = require("mongoose");

const getConnection = async () => {
  mongoose
    .connect(process.env.CONNECTION_STRING_MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      autoIndex: true,
    })
    .then(() => {
      console.log("db ok");
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error al conectar a la base de datos");
    });
};

mongoose.set('strictQuery', true);

module.exports = {
  getConnection
};
