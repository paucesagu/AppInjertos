import { FlatList, RefreshControl } from 'react-native'
import React , {useState, useEffect} from 'react'
import {getInjertos} from '../api';
import InjertosItem from './InjertosItem'


const InjertosList = () => {

  const [injertos, setInjertos] = useState([])  
  const [refreshing,setRefreshing] = useState(false)

  const loadInjertos = async () =>{
      const data = await getInjertos();
      setInjertos(data);
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
  return (
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
  )
}

export default InjertosList;