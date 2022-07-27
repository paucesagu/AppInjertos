import { FlatList, RefreshControl } from 'react-native'
import React , {useState, useEffect} from 'react'
import {getReentrenamientos} from '../api';
import EntrenamientoItem from './EntrenamientoItem'

const EntrenamientoList = () => {
  const [entrenamientos, setEntrenamiento] = useState([])  
  const [refreshing,setRefreshing] = useState(false)

  const loadEntrenamientos = async () =>{
      const data = await getReentrenamientos();
      setEntrenamiento(data);
  }


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