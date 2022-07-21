const controller = {};
const { getConnection } = require('../database')
const request = require('request');
const { response } = require('express');
const bcrypt = require("bcrypt");
const session =  require('express-session');
const jwt = require('jsonwebtoken');
const config = require("../config");

controller.login = async (req, res) => {
    try {
        const dni = req.body.dni.toUpperCase();
        const contraseña = req.body.contraseña;
       
        var connection = await getConnection();
        connection.query('SELECT * FROM usuarios WHERE dni = ?;', dni, (err, result) => {
            if(err){
              res.status(400);
                res.send(err);
            }
            if (result.length > 0) {
                bcrypt.compare(contraseña, result[0].contraseña, (error, response) => {
                  if (response) {
                    const token = jwt.sign({ id: dni }, config.SECRET, { expiresIn: 86400 }); //24h
                    //res.header("authorization",token).status(200).send(token);
                    res.header("authorization",token).status(200).send({message: "usuario loggeado", "token": token});
                   } else {
                    res.status(400).send({ message: "Usuario o contraseña incorrectos" });
                  }
                });
              } else {
                res.status(400).send({ message: "El usuario no existe" });
              }
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

controller.logout = async(req, res) => {
  try{
    let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
    let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
    //concatenar el token del usuario con el numero random y darle ese valor al token
    req.headers["authorization"] = req.headers["authorization"] + hashedRandomNumberToAppend;
    res.status(200).json({ message: "Usuario ha cerrado sesion" });
  }
  
catch(err){
  res.status(500).json(err.message);
}
};
/*Ahora con el token cambiado ya no será valido, se tendra que volver a loggear el usuario*/ 


module.exports = controller;

  