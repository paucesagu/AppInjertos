const { request } = require("express");

module.exports = {
isAdmin (req, res, next) {
    if(req.userRol == 'administrador'){
        next();
    }
    else{
        res.status(400).json({message: "Usuario no es administrador"});
    }
},
isTheSameUserOrAdmin (req, res, next){
    if((req.userID == req.params.dni.toUpperCase()) || (req.userRol == "administrador")){
        next();
    }
    else{
        res.status(400).json({message: "No puede acceder a esta información"});
    }
}   



};