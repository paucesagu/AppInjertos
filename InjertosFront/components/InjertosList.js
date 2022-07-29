import { FlatList, RefreshControl, Text, View, StyleSheet, Dimensions} from 'react-native'
import React , {useState, useEffect} from 'react'
import {getInjertos} from '../api';
import InjertosItem from './InjertosItem'
import {injertosNoEntrenados} from '../api'
import swal from 'sweetalert'



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
    <View style={{ flex: 1, margin: 5, backgroundColor: '#ddd', minWidth: {itemWidth}, maxWidth: {itemWidth}, height: 130}} >
    <FlatList
    style={{width:'100%', height:'100%',backgroundColor:'red', display:'contents'}}
            data={injertos}
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
  }
})

export default InjertosList;