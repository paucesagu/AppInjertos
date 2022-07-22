const controller = {};
const { getConnection } = require('../database')
const request = require('request');

controller.reentrenar = async (req, res) => {
    try{
        
        var usuario = req.userID;
        const connection = await getConnection();
        var fecha = new Date();
        //buscamos cual es el indice, si no ha habido algun reentrenamiento será 0, si existe alguno, será la ultima instancia reentrenada
        connection.query('SELECT * FROM reentrenamientos;', async (err, result) => {
            if(result.length===0){ //no existe ningun reentrenamiento
                var indice = 0;
              
            }else{
              //si existe un reentrenamiento devolvemos el mayor indice
              const result = await connection.query('SELECT ultima_instancia FROM reentrenamientos where ultima_instancia = (select max(ultima_instancia) from reentrenamientos)');
              console.log("guarda el indice")
              var indice = await JSON.parse(JSON.stringify(result))[0].ultima_instancia;
            
            }
            
        
        //procedemos a hacer la peticion 
        console.log("hace el request")
            request(
              {
                method: "GET",
                uri: `http://localhost:8080/reentrenar?indice=${indice}`,
                json: true,
              },
              async (error, response) => {
                if (error) {
                  throw error;
                }
                console.log("guardamos lo recibido en las variables")
                
                var solucion = await response.body;
                
                var numInstancias = solucion['numeroInstancias'];
                var tiempo = solucion['tiempoRequerido'];
                var ultInstancia = solucion['ultimaInstancia']; //ultima instancia que ha sido valorada de la base de datos
                var auc = solucion['valorAUC'];
                const connection = await getConnection();
                console.log("hacemos la conexion con la base de datos")
                await connection.query("INSERT INTO reentrenamientos (numero_instancias, fecha, auc, ultima_instancia, id_usuario, tiempo) VALUES (?,?,?,?,?,?);",
                [numInstancias, fecha, auc, ultInstancia, usuario, tiempo]);   
                
                  
                res.status(200).json(solucion);
                
                
                
              })});
              
          
          
          
                  } catch (error) {
                   
                      res.status(500);
                      res.send(error.message);
                    
                   
                    
        

        
}};




module.exports = controller;