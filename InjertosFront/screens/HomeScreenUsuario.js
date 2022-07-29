import React , {useState, useEffect} from 'react'
import InjertosList from '../components/InjertosList'
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import Layout from "../components/Layout";
import {injertosNoEntrenados, injertosNoValorados} from '../api'
import { EvilIcons } from '@expo/vector-icons';

const HomeScreenUsuario = () => {
  const [indice2, setIndice2] = useState([])  

  const loadIndice2 = async () =>{
    const data = await injertosNoValorados();
    setIndice2(data);
    console.log(data);
  }
  
  useEffect(() => {    
      
      loadIndice2() 
    }, [])


  return (
    <Layout>
      <View style={{display:'block'}}>
        <Text style={{fontSize:'15px'}}>Injertos no valorados:</Text> <Text style={{fontWeight: 'bold', fontSize:'15px'}}> {indice2}</Text>
        <TouchableOpacity style={styles.ButtonSave} onPress={loadIndice2} >
          <EvilIcons name="refresh" size={24} color="black" />
          <Text styles={{fontWeight: 'bold'}}>Actualizar valores</Text>
        </TouchableOpacity>
        
      </View>
        <InjertosList/>
    </Layout>
  )
}
  
const styles = StyleSheet.create({
    
  ButtonSave: {
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10,
    marginBottom:3,
    backgroundColor:'#9af88c',
    width:'100%',
    textAlign:'center',
  
  }
  
  
})

export default HomeScreenUsuario