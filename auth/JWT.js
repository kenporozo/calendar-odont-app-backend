const { sign } = require("jsonwebtoken");

const createJWT = ( user ) => {

  return new Promise( (resolve, reject) => {
      sign(
        JSON.parse(JSON.stringify(user)), 
        process.env.SECRETORPRIVATEKEY,
        {
          expiresIn: '3h'
        },
        (err, token ) => {
          if ( err ){
              console.log(err);
              reject('No se pudo generar el token');
          }
          resolve( token );
      })
  })
}

module.exports = createJWT;