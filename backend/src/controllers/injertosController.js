const controller = {};
const { getConnection } = require('../database')
const request = require('request');


//mostrar todos los injertos con sus valoraciones
controller.getInjertos = async (req, res) => {
  try {
     
        var connection = await getConnection();
        const result = await connection.query('SELECT id, edad, sexo, imc, hta, dm, dlp, apm, apq, got, gpt, ggt, na,bbt, acvhc, acvhbc, dosisna, aminas, ecografia_1, ecografia_2, ecografia_3,validez,acierto,probabilidad FROM injertos i LEFT OUTER JOIN valoraciones v ON  v.id_injerto = i.id order by i.fecha desc');
        var string=JSON.stringify(result);
        var json =  JSON.parse(string);
        var injerto = {};
        var arrayInjertos = [];
        for(var i of json){
          injerto.id = i.id;
          injerto.edad = i.edad;
          if(i.sexo == 0){
            injerto.sexo = "Femenino";
          }
          else{
            injerto.sexo = "Masculino";
          }
         
          injerto.imc = i.imc;
          injerto.hta = i.hta;
          injerto.dm = i.dm;
          injerto.dlp = i.dlp;
          injerto.apm = i.apm;
          injerto.apq = i.apq;
          injerto.got = i.got;
          injerto.gpt = i.gpt;
          injerto.ggt = i.ggt;
          injerto.na = i.na;
          injerto.bbt = i.bbt;
          injerto.acvhc = i.acvhc;
          injerto.acvhbc = i.acvhbc;
          injerto.dosisna = i.dosisna;
          if(i.ecografia_1 ==1){
            injerto.ecografia = "Normal";
          }
          else if(i.ecografia_2 ==1){
            injerto.ecografia = "Patológica";
          }
          else{
            injerto.ecografia = "No realizada";
          }
          if(i.validez ==0){
            injerto.validez = "Válido"
          }
          else{
            injerto.validez = "No válido";
          }
          if(i.acierto ==null){
            injerto.acierto = "Aún no se ha añadido"
          }
          else if(i.acierto ==1){
            injerto.acierto = "Acierto";
          }
          else{
            injerto.acierto = "Fallo"
          }
          if(i.probabilidad ==null){
            injerto.probabilidad = "Aún no se ha validado";
          }
          else{
            injerto.probabilidad = i.probabilidad;
          }
          
          arrayInjertos.push({...injerto});
         
        }
        
        
        res.status(200);
         res.send(arrayInjertos)
         
      
  } catch (error) {
    
      res.status(500);
      res.send(error.message);
    }
  
};



//ver solo un injerto
controller.getInjerto = async (req, res) => {
try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query('SELECT id, edad, sexo, imc, hta, dm, dlp, apm, apq, got, gpt, ggt, na,bbt, acvhc, acvhbc, dosisna, aminas, ecografia_1, ecografia_2, ecografia_3, fecha, validez,acierto,probabilidad FROM injertos i LEFT OUTER JOIN valoraciones v ON  v.id_injerto = i.id where id = ?', id);
    var string=JSON.stringify(result);
    var json =  JSON.parse(string);
    var injerto = {};
    injerto.id = json[0].id;
    injerto.edad = json[0].edad;
    if(json[0].sexo == 0){
      injerto.sexo = "Femenino";
    }
    else{
      injerto.sexo = "Masculino";
    }

    injerto.imc = json[0].imc;
    injerto.hta = json[0].hta;
    injerto.dm = json[0].dm;
    injerto.dlp = json[0].dlp;
    injerto.apm = json[0].apm;
    injerto.apq = json[0].apq;
    injerto.got = json[0].got;
    injerto.gpt = json[0].gpt;
    injerto.ggt = json[0].ggt;
    injerto.na = json[0].na;
    injerto.bbt = json[0].bbt;
    injerto.acvhc = json[0].acvhc;
    injerto.acvhbc = json[0].acvhbc;
    injerto.dosisna = json[0].dosisna;
    injerto.aminas=json[0].aminas;
    injerto.fecha = json[0].fecha;
    
    if(json[0].ecografia_1 ==1){
      injerto.ecografia = "Normal";
    }
    else if(json[0].ecografia_2 ==1){
      injerto.ecografia = "Patológica";
    }
    else{
      injerto.ecografia = "No realizada";
    }
    if(json[0].validez == 0){
      injerto.validez="Válido";
    }else if(json[0].validez == 1){
      injerto.validez="No válido";
    }
    if(json[0].acierto ==null){
      injerto.acierto = "Aun no se ha añadido"
    }
    else if(json[0].acierto ==1){
      injerto.acierto = "Acierto";
    }
    else{
      injerto.acierto = "Fallo"
    }
    if(json[0].probabilidad ==null){
      injerto.probabilidad = "Aún no se ha validado";
    }
    else{
      injerto.probabilidad = json[0].probabilidad;
    }
    
    
    
    
       res.send(injerto);
 
} catch (error) {
  
    res.status(500);
    res.send(error.message);

}
};



//crear un injerto
controller.addInjerto = async (req, res)  => {
  try {
    var edad = req.body.edad;
    if(req.body.sexo == null){
      
      res.status(400).json({ message: "No pueden ser nulos los campos" });
      
    }
    else{
    if(req.body.sexo == 'Masculino'){
      var sexo = 1;
    }
    else{
      var sexo = 0;
    }}
    var imc = req.body.imc;
    var hta = req.body.hta;
    var dm = req.body.dm;
    var dlp = req.body.dlp;
    var apm = req.body.apm; 
    var apq = req.body.apq; //el boton devolvera true o false
    if(req.body.ecografia == null){
      
      res.status(400).json({ message: "No pueden ser nulos los campos" });}
    
    else{
      if(req.body.ecografia == 'Normal'){
        var ecografia_1 = 1;
        var ecografia_2 = 0;
        var ecografia_3 = 0;
      }
      else if(req.body.ecografia == 'Patológica'){
        var ecografia_1 = 0;
        var ecografia_2 = 1;
        var ecografia_3 = 0;
      }
      else{
        var ecografia_1 = 0;
        var ecografia_2 = 0;
        var ecografia_3 = 1;
      }
    }
    
    
    var got = req.body.got;
    var gpt = req.body.gpt;
    var ggt = req.body.ggt;
    var na    = req.body.na;
    var bbt = req.body.bbt;
    var acvhc = req.body.acvhc; 
    var acvhbc = req.body.acvhbc;
    if(req.body.dosisna == null) {
      var dosisna = 0.0;
    }
    else{
      dosisna = req.body.dosisna;
    }
    var aminas = req.body.aminas;
    console.log("se ha procesado el cuerpo")
    
    if (edad == null || imc == null || got == null || gpt == null || ggt == null || na == null || bbt == null)  {
      
        res.status(400).json({ message: "No pueden ser nulos los campos" });
     
      
    }
    
    
    else{
      console.log("ha pasado la validacion")
      
      var fecha = new Date();
      const newInjerto = {
        edad, sexo, imc, hta, dm, dlp, apm, apq, got, gpt, ggt, na,bbt, acvhc, acvhbc, dosisna, aminas, ecografia_1, ecografia_2, ecografia_3, fecha
    };
    console.log("esperando conexion")
    const connection = await getConnection();
    var respuesta = await connection.query('INSERT INTO injertos set ?', [newInjerto]);
    console.log("Injerto insertado");
    
    res.status(200).json({ message: "Exito. Injerto creado" });
    }
  } catch (error) {
   
      res.status(500);
  
  
  }  

};



//editar un injerto
controller.editInjerto = async (req, res)  => {
try {
  var id = req.params.id;
  var edad = req.body.edad;
  var imc = req.body.imc;
  var hta = req.body.hta;
  var dm = req.body.dm;
  var dlp = req.body.dlp;
  var apm = req.body.apm; 
  var apq = req.body.apq; //el boton devolvera true o false
  var got = req.body.got;
  var gpt = req.body.gpt;
  var ggt = req.body.ggt;
  var na    = req.body.na;
  var bbt = req.body.bbt;
  var acvhc = req.body.acvhc; 
  var acvhbc = req.body.acvhbc;
  var acierto = req.body.acierto;
  if(req.body.dosisna == null) {
    var dosisna = 0.0;
  }
  else{
    dosisna = req.body.dosisna;
  }
  var aminas = req.body.aminas;
  if(req.body.sexo == null || req.body.ecografia == null || edad == null || imc == null || got == null || gpt == null || ggt == null || na == null || bbt == null){ 
    res.status(400).json({ message: "No pueden ser nulos los campos" })
  }
  else{
  if(req.body.sexo == 'Masculino'){
    var sexo = 1;
  }
  else{
    var sexo = 0;
  }
  if(req.body.ecografia == 'Normal'){
    var ecografia_1 = 1;
    var ecografia_2 = 0;
    var ecografia_3 = 0;
  }
  else if(req.body.ecografia == 'Patológica'){
    var ecografia_1 = 0;
    var ecografia_2 = 1;
    var ecografia_3 = 0;
  }
  else{
    var ecografia_1 = 0;
    var ecografia_2 = 0;
    var ecografia_3 = 1;
  }
  const connection = await getConnection();
  
  console.log("se ha procesado el cuerpo")
  connection.query("SELECT * FROM valoraciones where id_injerto = ?", id, async (err, result) => {
      if(result.length  > 0) { //ya se ha valorado ese injerto
        await connection.query('UPDATE valoraciones set acierto=? WHERE id_injerto = ?', [acierto, id]);
        console.log("Acierto modificado");
        res.status(200).json({ message: "Exito. Acierto modificado" });

    }
    else{
      var fecha = new Date();
      const newInjerto = {
        edad, sexo, imc, hta, dm, dlp, apm, apq, got, gpt, ggt, na,bbt, acvhc, acvhbc, dosisna, aminas, ecografia_1, ecografia_2, ecografia_3, fecha
    };
    console.log("esperando conexion")
    
    await connection.query('UPDATE injertos set ? WHERE id = ?', [newInjerto, id]);
    console.log("Injerto modificado");
    res.status(200).json({ message: "Exito. Injerto modificado" });
    }
    
  

  })
}}catch (error) {
  
    res.status(500);
    res.send(error.message);
  

}  

};


//devolver la predicción y crear valoracion

controller.prediccion = async (req, res) => {
try{
var usuario = req.userID;
const connection = await getConnection();
var injerto = await connection.query('SELECT * FROM injertos WHERE id = ?', [req.params.id]);    
var edad = injerto[0].edad;
var sexo = injerto[0].sexo;
var imc = injerto[0].imc;
var hta = injerto[0].hta;
var dm = injerto[0].dm;
var dlp = injerto[0].dlp
var apm = injerto[0].apm; 
var apq = injerto[0].apq; //el boton devolvera true o false
var ecografia_1 = injerto[0].ecografia_1;
var ecografia_2 = injerto[0].ecografia_2; 
var ecografia_3 = injerto[0].ecografia_3;
var got = injerto[0].got;
var gpt = injerto[0].gpt;
var ggt = injerto[0].ggt;
var na    = injerto[0].na;
var bbt = injerto[0].bbt;
var acvhc = injerto[0].acvhc; 
var acvhbc = injerto[0].acvhbc;
var dosisna = injerto[0].dosisna;
var aminas = injerto[0].aminas;

var params = `edad=${edad}&sexo=${sexo}&imc=${imc}&hta=${hta}&dm=${dm}&dlp=${dlp}&apm=${apm}&apq=${apq}&got=${got}&gpt=${gpt}&ggt=${ggt}&na=${na}&bbt=${bbt}&acvhc=${acvhc}&acvhbc=${acvhbc}&dosisna=${dosisna}&aminas=${aminas}&ecografia_1=${ecografia_1}&ecografia_2=${ecografia_2}&ecografia_3=${ecografia_3}`;
//comprobamos que no hay ninguna valoracion para ese injerto especifico
connection.query('SELECT * FROM valoraciones WHERE id_injerto = ?;', req.params.id, (err, result) => {
  if(result.length!==0){ //existe una valoracion
    
      res.status(400).json({ message: "Este injerto ya tiene una valoración" });
    
  }else{
    //si no hay ninguna valoracion procedemos a hacer la peticion
          
    request(
      {
        method: "GET",
        uri: `http://localhost:8080/predict?${params}`,
        json: true,
      },
      async (error, response) => {
        if (error) {
          throw error;
        }
        var solucion = response.body;
        if(solucion['clasificacion'] == 'No valido'){
          var clasificacion = 1
        }
        else{
          var clasificacion = 0;
        }
        
        var probabilidad = solucion['probabilidad'];
        const connection = await getConnection();
        
        await connection.query("INSERT INTO valoraciones (validez, probabilidad, id_injerto, id_usuario) VALUES (?,?,?,?);",
        [clasificacion, probabilidad, req.params.id, usuario]);   
        
          
        res.status(200).json(solucion);
        
        
        
      });
      
  }})
  
  
          } catch (error) {
           
              res.status(500);
              res.send(error.message);
            
           
            
            }  

      };

   



module.exports = controller;