const controller = {};
const { getConnection } = require('../database')
const request = require('request');
const { response } = require('express');
const bcrypt = require("bcrypt");
const saltRounds = 10;

var regexEmail = /^[a-z0-9._-]+@[a-z.-]+\.[a-z]{2,4}$/;
var regexTelefono = new RegExp('(6|7)[ -]*([0-9][ -]*){8}');
var regexDNI = /^[0-9]{8}[A-Z]{1,1}$/;
var regexContraseña = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})");


controller.getUsuarios = async (req, res) => {
    try {
        var connection = await getConnection();
        const result = await connection.query('SELECT * FROM usuarios');
        
            res.status(200).json(result);
          
        
    } catch (error) {
        
            res.status(500);
            res.send(error.message);
          
        
    }
  };

  controller.getUser = async (req, res, next) => {
    try {
        var connection = await getConnection();
        const result = await connection.query('SELECT * FROM usuarios where dni = ?', req.params.dni.toUpperCase());
        var string=JSON.stringify(result);
        var json =  JSON.parse(string);
        var usuarios = {};
        usuarios.dni=json[0].dni
        usuarios.nombre=json[0].nombre
        usuarios.apellidos=json[0].apellidos
        usuarios.telefono=json[0].telefono
        usuarios.email=json[0].email
        usuarios.contraseña=json[0].contraseña
        usuarios.rol=json[0].rol
        res.send(usuarios);
         
          
    } catch (error) {
        
            res.status(500);
            res.send(error.message);
          
    }
  };

  controller.crearUsuario = async (req, res) => {
    try {
      var dni = req.body.dni.toUpperCase();
      var contraseña = req.body.contraseña;
      var nombre = req.body.nombre;
      var apellidos = req.body.apellidos;
      var email = req.body.email;
      var telefono = req.body.telefono;
      var rol= req.body.rol;
     
      console.log("Entra en las valoraciones");
      if(dni == null || contraseña == null || email == null || telefono == null || nombre == null){
        
       
          res.status(400).json({ message: "Los campos no pueden ser nulos" });
          
      }
      
      else if(!regexDNI.test(dni) || !regexEmail.test(email.toLowerCase()) || !regexTelefono.test(telefono)) {
        console.log("pasa las valoraciones de nulos");
        
        
       
          res.status(400).json({ message: "El formato introducido de DNI, email o teléfono no es el correcto" });
       
      }
      
      else if(!regexContraseña.test(contraseña)){
        console.log("pasa las valoraciones de regex");
        
          res.status(400).json({ message: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula." });
          
        }
     
      else{
        console.log("pasa la valoracion de la contraseña");
        var connection = await getConnection();
        connection.query('SELECT * FROM usuarios WHERE dni = ?;', dni, (err, result) => {
          console.log("se ha conectado");
          if(result.length!==0){
            
         
              res.status(400).json({ message: "El usuario ya existe" });
            
          }})
          console.log("pasa la valoracion de existencia")
  
        bcrypt.hash(contraseña, saltRounds, async(err, hash) => {
            if (err) {
              console.log(err);
            }
          
            var connection = await getConnection();
            await connection.query('INSERT INTO usuarios (dni, nombre, apellidos, telefono, email, contraseña, rol) VALUES (?, ?, ?, ?,?,?,?)', [dni, nombre, apellidos, telefono, email, hash, rol]);
            console.log('usuario insertado')
           
         
              res.sendStatus(204);
  
      })
      }
      
    } catch (error) {
     
        res.status(500);
        res.send(error.message);
      
    }
  }





  controller.editUser = async (req, res) => {
    try {
      var dni = req.params.dni.toUpperCase();
      var nombre = req.body.nombre;
      var apellidos = req.body.apellidos;
      var email = req.body.email;
      var telefono = req.body.telefono;
      var contraseña = req.body.contraseña;
      var rol= req.body.rol;
      
      console.log("esperando conexion");
      console.log(regexEmail.test(email));
      if(!regexEmail.test(email) || !regexTelefono.test(telefono)){
        
       
          res.status(400).json({ message: "El formato introducido de telefono o email no es el correcto" });
      }

      
      const newUser = {
        dni, nombre, apellidos, telefono, email, contraseña, rol 
        };
      const connection = await getConnection();
      await connection.query('UPDATE usuarios set ? WHERE dni = ?', [newUser, dni]);
      console.log("Usuario modificado");
      
            return res.sendStatus(204).json
            return res.status(204).json({ message: "Injerto modificado" });

    } catch (error) {
     
        res.status(500);
        res.send(error.message);
        return res.status(400).json
      

  };
};

controller.modificarContraseña = async (req, res) => {
  try {
    var dni = req.params.dni.toUpperCase();
    var contraseñaAntigua = req.body.contraseñaAntigua;
    var contraseñaNueva1 = req.body.contraseñaNueva1;
    var contraseñaNueva2= req.body.contraseñaNueva2;
    console.log(regexContraseña.test(contraseñaNueva1))
    if(!regexContraseña.test(contraseñaNueva1)){
      
        res.status(400).json({ message: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula." });

    }
    else{
      console.log("esperando conexion")
      const connection = await getConnection();
      //cogemos al usuario, comprobamos que tiene autorizacion, se sabe la contraseña actual
      connection.query('SELECT * FROM usuarios WHERE dni = ?;', dni, (err, result) => {
        if(err){
          
            res.status(400);
            res.send(err);
            
        }
        bcrypt.compare(contraseñaAntigua, result[0].contraseña, (error, response) => {
          console.log("entra en la comparacion");
          if (response) {//la contraseña actual coinciden
            if (contraseñaNueva1 === contraseñaNueva2) {
              //las contraseñas coinciden, se modifica la contraseña
              bcrypt.hash(contraseñaNueva1, saltRounds, async(err, hash) => {
                if (err) {
                  console.log(err);
                }
                console.log("hace el hash");
                var connection = await getConnection();
                await connection.query('UPDATE usuarios SET contraseña = ? WHERE dni = ?', [hash, dni]);
                console.log('contraseña modificada')
               
                  res.sendStatus(204);
                
                
    
          })} else {
            
              
              res.status(400).json({ message: "Los campos de las contraseñas nuevas no coinciden" });
            
          }
        }
        else {
          
            res.status(400).json({ message: "La contraseña actual no es correcta" });
          
        }});
  
      })
    }
    



    
  
  } catch (error) {
    
      res.status(500);
      res.send(error.message);
    
  }
};

controller.deleteUsuario = async (req, res) => {
  const connection = await getConnection();
  const result = await connection.query("DELETE FROM usuarios WHERE dni = ?", [
    req.params.dni.toUpperCase(),
  ]);
  console.log(result);

  res.sendStatus(204);
};




  module.exports = controller;