import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {modificarContraseña} from "../api"
import Row from 'react-bootstrap/Row';
import { FontAwesome5 } from '@expo/vector-icons';
import swal from 'sweetalert'



const UpdateContraseña = ({navigation, route}) => {
  //var userDNI = localStorage.getItem('userDNI');
  
    const[contraseña,setContraseña] = useState({
        contraseñaAntigua:"",
        contraseñaNueva1:"",
        contraseñaNueva2:"",
    });


    const handleChange= (name, value) => setContraseña({...contraseña, [name]:value,})

console.log(route.params.dni)
    const handleSubmit = async () => {
      console.log(contraseña)
        const resultado = await modificarContraseña(route.params.dni, contraseña)
        console.log(resultado)
        if(resultado.includes("Exito")){
          swal("Enhorabuena", resultado, "success");
          }
          else{
            swal("Ha habido un error", resultado, "error");
          }
      
     
    }

  
    

  return (
    <View style={{alignItems: 'center',
  justifyContent: 'center',
  textAlign:'left',backgroundColor: 'white', width: '100%', height: '100%'}}>

    <View style={{flex: 1,flexDirection: 'row',flexWrap: 'wrap',alignItems: 'flex-start', justifyContent: 'center'}}>
      
      <View style={{ width: '100%', marginTop:50 }}>

        <Text style={{fontWeight: 'bold'}}>Contraseña Actual: </Text>
        <TextInput style={styles.input}
          placeholder='Añada su contraseña actual'
          onChangeText={text => handleChange('contraseñaAntigua', text)}
          />

          <Text style={{fontWeight: 'bold'}}>Nueva contraseña: </Text>
          <TextInput style={styles.input}
          placeholder='Añada su contraseña nueva'
          onChangeText={text => handleChange('contraseñaNueva1', text)}
          />

          <Text style={{fontWeight: 'bold'}}>Repita de nuevo la contraseña: </Text>
          <TextInput style={styles.input}
          placeholder='Añada su contraseña nueva'
          onChangeText={text => handleChange('contraseñaNueva2', text)}
        />
          
      </View>
      
      
        <Row>

        
      <View style={{width: '100%'}}>
      <TouchableOpacity style={styles.ButtonSave} onPress={handleSubmit}>
        <FontAwesome5 name="user-edit" size={24} color="black" />
        <Text styles={{fontWeight: 'bold', marginLeft:4}}>Modificar contraseña</Text>
      </TouchableOpacity>
      </View>
      </Row>
    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
      width:'100%',
      backgroundColor:'#FFFFFF',
      fontSize:15,
      marginBottom:7,
      borderWidth: 1,
      borderColor:'#9af88c',
      height:30,
      textAlign: 'center',
      padding: 4,
      borderRadius:5,
      flex: 1,
    },
    inputFecha:{
      width:'100%',
      backgroundColor:'#FFFFFF',
      fontSize:15,
      marginBottom:7,
      borderWidth: 1,
      borderColor:'#9af88c',
      height:30,
      textAlign: 'center',
      padding: 4,
      borderRadius:5,
      flex: 1,
    },
    ButtonSave: {
      marginTop:3,
      padding:20,
      borderRadius:10,
      marginBottom:3,
      backgroundColor:'#9af88c',
      width:'100%',
      textAlign:'center',
      display: 'block',
      
    },
    ButtonText:{
      fontWeight:'bold',
    },
    texto:{
      fontWeight: 'bold',
    }
  })

export default UpdateContraseña