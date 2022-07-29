import { FlatList, RefreshControl } from 'react-native'
import React , {useState, useEffect} from 'react'
import {getUsuarios} from '../api';
import UsersItem from './UsersItem'
import swal from 'sweetalert'

const UsersList = () => {

    const [usuarios, setUsuarios] = useState([])  
    const [refreshing,setRefreshing] = useState(false)
  
    const loadUsers = async () =>{
      const result = await getUsuarios();
      var mensaje = result.message;
      var data = result.result;
      if(mensaje.includes("Exito")){
        setUsuarios(data);
      }
      else{
        swal("Ha habido un error", mensaje, "error");
      }
    }
  
  
    useEffect(() => {    
        loadUsers()
    }, [])
  
    const renderItem = ({ item }) =>{
      return <UsersItem usuarios={item}/>
    }
  
    const onRefresh = React.useCallback(async()=>{
      setRefreshing(true);
      await loadUsers()
      setRefreshing(false);
    })
    return (
      <FlatList
      style={{width:'100%', height:'100%',backgroundColor:'red', display:'contents'}}
              data={usuarios}
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
  export default UsersList;
