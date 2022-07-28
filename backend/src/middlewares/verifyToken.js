const { request } = require('express');
const jwt = require('jsonwebtoken');
const config = require("../config");
const { getConnection } = require('../database')

const verifyToken = async (req, res, next) =>{
    try {
          
        let token = req.headers["authorization"]; //cogemos el token de la cabecera
        if (!token) return res.status(403).json({ message: "No se ha dado ningún token" });
        const decoded = jwt.verify(token, config.SECRET);
        req.userID = decoded.id; //creamos una nueva propiedad en request que se llama userID
        var connection = await getConnection();
        await connection.query('SELECT * FROM usuarios WHERE dni = ?;', req.userID, (err, result) => {
            if(result.length == 0) {
                res.status(400).json({ message: "No se ha encontrado el usuario" });
            }
            else{
                var string=JSON.stringify(result);
                var json =  JSON.parse(string)[0];
                req.userRol = json.rol; //guardamos el rol en el atributo userRol del request
                next();
            }
            
           
    })
        
    } catch (error) {
        return res.status(400).json({ message: "No está loggeado" });
    }
    

  };

  module.exports = {
   verifyToken
};