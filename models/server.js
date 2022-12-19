const express = require("express");
const cors = require("cors");
const {getConnection} = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.basePath = "/api/calendar-odont";

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    //BD
    getConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio Público
    this.app.use(express.static("public"));

    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(this.basePath, require("../routes/user"));
    this.app.use(this.basePath, require("../routes/dentist"));
    this.app.use(this.basePath, require("../routes/reservation"));
  }

  listener() {
    this.app.listen(this.port, () => {
      console.log("Server running at port", this.port);
    });
  }
}

module.exports = Server;