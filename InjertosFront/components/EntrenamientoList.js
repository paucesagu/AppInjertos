import { FlatList, RefreshControl } from 'react-native'
import swal from 'sweetalert'
import React , {useState, useEffect} from 'react'
import {getReentrenamientos} from '../api';
import EntrenamientoItem from './EntrenamientoItem'

const EntrenamientoList = () => {
  const [entrenamientos, setEntrenamiento] = useState([])  
  const [refreshing,setRefreshing] = useState(false)

  const loadEntrenamientos = async () =>{
    const result = await getReentrenamientos();
    console.log(result);
    var mensaje = result.message;
    var data = result.arrayReentreno;
    if(mensaje.includes("Exito")){
      setEntrenamiento(data);
    }
    else{
      swal("Ha habido un error", mensaje, "error");
    }
  }
console.log(entrenamientos);

  useEffect(() => {    
    loadEntrenamientos()
  }, [])

  const renderItem = ({ item }) =>{
    return <EntrenamientoItem entrenamientos={item}/>
  }

  const onRefresh = React.useCallback(async()=>{
    setRefreshing(true);
    await loadUsers()
    setRefreshing(false);
  })
  
  return (
    <FlatList
    style={{width:'100%', height:'100%',backgroundColor:'red', display:'contents'}}
            data={entrenamientos}
            numColumns = {3}
            keyExtractor={(item) => item.id +''}
            renderItem = {renderItem}
            refreshControl={
              <RefreshControl
              colors={["#9af88c"]} 
              onRefresh={onRefresh}
              refreshing={refreshing}
              progressBackgroundColor="#red"
              />
            }
    />
  )
}

export default EntrenamientoList