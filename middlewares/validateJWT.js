const { request, response } = require("express");
const {verify} = require("jsonwebtoken");

const validateToken = (req = request, res = response, next) =>{

    const token = req.header("x-auth-token");
    
    if(!token){
        return res.status(401).json({
            cod : 401,
            msg : "No hay token en la petición"
        });
    }
    try {
        const payload = verify(token, process.env.SECRETORPRIVATEKEY);
        req.body.payload = payload;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            cod : 401,
            msg : "Token no válido" 
        })
    }
}

module.exports = {
    validateToken
};