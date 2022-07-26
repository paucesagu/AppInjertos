const controller = {};
const { getConnection } = require('../database')
const request = require('request');


async function obtenerUltimaInstancia(){
  var ultima =  0;
  const connection =  await getConnection();
  await connection.query('SELECT ultima_instancia FROM reentrenamientos where ultima_instancia = (select max(ultima_instancia) from reentrenamientos)').then(
    result => ultima = result);
    ultima = JSON.parse(JSON.stringify(ultima))[0].ultima_instancia;
  return ultima;
  
};





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
              //si existe un reentrenamiento devolvemos la ultima instancia reentrenada
              var indice = await obtenerUltimaInstancia();
              console.log(indice);
            }
            
        connection.query('SELECT * FROM valoraciones where id_injerto>?', indice, async (err, result2) => {
          console.log(result2)
          console.log(indice)
          if(result2.length===0){ //no hay nuevas instancias completas para reentrenar
            res.status(400).json({ message: "No hay nuevas instancias completas para reentrenar" })
          
        }else{
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
            console.log(solucion)
            var numInstancias = solucion['numeroInstancias'];
            var tiempo = solucion['tiempoRequerido'];
            var ultInstancia = solucion['ultimaInstancia']; //ultima instancia que ha sido valorada de la base de datos
            var auc = solucion['valorAUC'];
            var acc = solucion['valorACC'];
            const connection = await getConnection();
            console.log("hacemos la conexion con la base de datos")
            await connection.query("INSERT INTO reentrenamientos (numero_instancias, fecha, auc, ultima_instancia, id_usuario, tiempo, acc) VALUES (?,?,?,?,?,?,?);",
            [numInstancias, fecha, auc, ultInstancia, usuario, tiempo, acc]);   
            
              
            res.status(200).json({message: "Exito, se ha reentrenado correctamente", solucion});
            
            
            
          })
        
        }

        })
            
        
      });
              
          
          
          
                  } catch (error) {
                   
                      res.status(500);
                      res.send(error.message);
                    
                   
                    
        

        
}};

controller.injertosNoEntrenados = async (req, res) => {
try {
  console.log("obtenemos indice")
  var indice = await obtenerUltimaInstancia();
  console.log(indice);
  console.log("establecemos conexion");
  const connection = await getConnection();
  console.log("buscamos valoraciones")
  var result = await connection.query('select * from valoraciones where id_injerto>?', indice) 
    res.status(200).json(result.length);
      

} catch (error) {
  res.status(500);
  res.send(error.message);
}
};


controller.getReentrenamientos = async (req, res) => {
  try {
    var connection = await getConnection();
    const result = await connection.query('SELECT * FROM reentrenamientos order by fecha desc');
    var string=JSON.stringify(result);
    var json =  JSON.parse(string);
    console.log(json);
    var reentreno = {};
    var arrayReentreno = [];
    for(var i of json){
      reentreno.ultima_instancia = i.ultima_instancia;
      reentreno.numero_instancias = i.numero_instancias;
      var fecha = i.fecha;
      let firstArray = fecha.split("T");

      let dma = firstArray[0].split('-');
      let fmt = dma[2] + '/' + dma[1] + '/' + dma[0];

      let hms = firstArray[1].split(":");
      let hm = hms[0] + ":" + hms[1];
      fecha = fmt + " " + hm;
      reentreno.fecha = fecha;
      reentreno.auc = i.auc;
      reentreno.acc = i.acc;
      var tiempo = String(i.tiempo);
      reentreno.tiempo = tiempo + "segundos"
      arrayReentreno.push({...reentreno});

    }
    res.status(200).json({message: "Exito. se han conseguido correctamente", arrayReentreno});
      
    
} catch (error) {
    
        res.status(500);
        res.send(error.message);
      
    
}
};



module.exports = controller;