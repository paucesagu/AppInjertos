import { FlatList, RefreshControl, TouchableOpacity, View, StyleSheet, Dimensions, Text, ImageBackground} from 'react-native'
import swal from 'sweetalert'
import React , {useState, useEffect} from 'react'
import {getReentrenamientos} from '../api';
import EntrenamientoItem from './EntrenamientoItem'
import { EvilIcons } from '@expo/vector-icons';


const EntrenamientoList = () => {
  const [entrenamientos, setEntrenamiento] = useState([])  
  const [refreshing,setRefreshing] = useState(false)

  const loadEntrenamientos = async () =>{
    const result = await getReentrenamientos();
    
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
  const {height, width} = Dimensions.get('window');
  const itemWidth = (width - 15) / 2;
  
  return (
    <View style={{backgroundColor:"white"}}>
<TouchableOpacity style={{display: 'block'}} onPress={loadEntrenamientos}>
        <EvilIcons name="refresh" size={24} color="black" />
        <Text styles={{fontWeight: 'bold'}}>Actualizar</Text>
      </TouchableOpacity>    
      <View style={{ flex: 1, margin: 5 ,minWidth: {itemWidth}, maxWidth: {itemWidth}, height: 130}} >
        <FlatList
        style={{width:'100%', height:'100%', display:'contents'}}
                data={entrenamientos}
                numColumns = {3}
                columnWrapperStyle={styles.row}
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
     </View>
     </View>
  )
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around"
}
});

export default EntrenamientoList