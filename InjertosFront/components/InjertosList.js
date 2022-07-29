import { FlatList, RefreshControl, TouchableOpacity, View, StyleSheet, Dimensions, Text} from 'react-native'
import React , {useState, useEffect} from 'react'
import {getInjertos} from '../api';
import InjertosItem from './InjertosItem'
import swal from 'sweetalert'
import { EvilIcons } from '@expo/vector-icons';



const InjertosList = () => {

  const [injertos, setInjertos] = useState([])  
  const [refreshing,setRefreshing] = useState(false)

  const loadInjertos = async () =>{
      const result = await getInjertos();
      var mensaje = result.message;
      var data = result.arrayInjertos;
      if(mensaje.includes("Exito")){
        setInjertos(data);
      }
      else{
        swal("Ha habido un error", mensaje, "error");
      }
     
  }
    

  

useEffect(() => {    
  loadInjertos()
}, [])

  const renderItem = ({ item }) =>{
    return <InjertosItem injertos={item}/>
  }

  const onRefresh = React.useCallback(async()=>{
    setRefreshing(true);
    await loadInjertos()
    setRefreshing(false);
  })
  const {height, width} = Dimensions.get('window');
  const itemWidth = (width - 15) / 2;
  return (
    <View>
    <TouchableOpacity style={{display: 'block'}} onPress={loadInjertos}>
        <EvilIcons name="refresh" size={24} color="black" />
        <Text styles={{fontWeight: 'bold'}}>Actualizar</Text>
      </TouchableOpacity>    
      <View style={{ flex: 1, margin: 5 ,minWidth: {itemWidth}, maxWidth: {itemWidth}, height: 130}} >
    <FlatList
    style={{width:'100%', height:'100%', display:'contents'}}
            data={injertos}
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

  item:{
      backgroundColor:"#FFFFFF",
      padding:20,
      marginVertical:8,
      borderRadius:5,
      textAlign:"left",
      borderWidth: 3,
      borderColor:'#9af88c',
      borderRadius:10,   
  },
  container:{
    alignItems: 'left',
    justifyContent: 'left',
    textAlign:'left',
    width:"100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
}
})

export default InjertosList;