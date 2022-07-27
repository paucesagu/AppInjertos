import { FlatList, RefreshControl, Text, View, StyleSheet} from 'react-native'
import React , {useState, useEffect} from 'react'
import {getInjertos} from '../api';
import InjertosItem from './InjertosItem'
import {injertosNoEntrenados} from '../api'



const InjertosList = () => {

  const [injertos, setInjertos] = useState([])  
  const [refreshing,setRefreshing] = useState(false)

  const loadInjertos = async () =>{
      const data = await getInjertos();
      setInjertos(data);
  }

  const [indice, setIndice] = useState([])  

  const loadIndice = async () =>{
    const data = await injertosNoEntrenados();
    setIndice(data);
    console.log(data);
}

useEffect(() => {    
  loadIndice() ,
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
  return (
    <View>
      <View style={{display:'block'}}>
        <Text style={{fontSize:'15px'}}>Injertos sin entrenar:</Text> <Text style={{fontWeight: 'bold', fontSize:'15px'}}> {indice}</Text>
      </View>
    <FlatList
    style={{width:'100%', height:'100%',backgroundColor:'red', display:'contents'}}
            data={injertos}
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