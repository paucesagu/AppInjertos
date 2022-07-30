import { FlatList, RefreshControl, TouchableOpacity, View, StyleSheet, Dimensions, Text} from 'react-native'
import React , {useState, useEffect} from 'react'
import {getUsuarios} from '../api';
import UsersItem from './UsersItem'
import swal from 'sweetalert'
import { EvilIcons } from '@expo/vector-icons';
import Row from 'react-bootstrap/Row';



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
    const {height, width} = Dimensions.get('window');
  const itemWidth = (width - 15) / 2;1
    return (
      <View>
        <TouchableOpacity style={{display: 'block'}} onPress={loadUsers}>
        <EvilIcons name="refresh" size={24} color="black" />
        <Text styles={{fontWeight: 'bold'}}>Actualizar</Text>
        </TouchableOpacity>    
        <View style={{ flex: 1, margin: 5 ,minWidth: {itemWidth}, maxWidth: {itemWidth}, height: 130}} >
        <FlatList
        style={{width:'100%', height:'100%', display:'contents'}}
                data={usuarios}
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
  export default UsersList;
