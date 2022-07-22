const controller = {};
const { getConnection } = require('../database')
const request = require('request');

controller.reentrenar = async (req, res) => {
    try{
        console.log("entra en la funcion")
        var usuario = req.userID;
        const connection = await getConnection();
        var indice;
        //buscamos cual es el indice, si no ha habido algun reentrenamiento será 0, si existe alguno, será la ultima instancia reentrenada
        connection.query('SELECT * FROM reentrenamientos;', (err, result) => {
            if(result.length===0){ //no existe ningun reentrenamiento
                indice = 0;
              
            }else{
              //si existe un reentrenamiento devolvemos el mayor indice
              const result = connection.query('SELECT ultima_instancia FROM reentrenamientos where ultima_instancia = (select max(ultima_instancia) from reentrenamientos)');
              
            console.log(JSON.parse(JSON.stringify(result))[0].ultima_instancia);
            }
            res.status(200).json({message: "Hola"});
        /*//var params = `edad=${edad}&sexo=${sexo}&imc=${imc}&hta=${hta}&dm=${dm}&dlp=${dlp}&apm=${apm}&apq=${apq}&got=${got}&gpt=${gpt}&ggt=${ggt}&na=${na}&bbt=${bbt}&acvhc=${acvhc}&acvhbc=${acvhbc}&dosisna=${dosisna}&aminas=${aminas}&ecografia_1=${ecografia_1}&ecografia_2=${ecografia_2}&ecografia_3=${ecografia_3}`;
        //comprobamos que no hay ninguna valoracion para ese injerto especifico
        connection.query('SELECT * FROM reentrenamientos;',(err, result) => {
          if(result.length==0){ //no existe una valoracion
            
              res.status(400).json({ message: "Este injerto ya tiene una valoración" });
            
          }else{

          }

            })
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
                
                
                
              });*/
              
          })
          
          
                  } catch (error) {
                   
                      res.status(500);
                      res.send(error.message);
                    
                   
                    
        

        
}};




module.exports = controller;