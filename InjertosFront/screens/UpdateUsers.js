import { View, TextInput, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React, {useState, useEffect} from 'react'
import {getUser} from "../api"
import {editarUsuario} from "../api"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RNPickerSelect from "react-native-picker-select";
import {useNavigation} from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';

const UpdateUsers = ({navigation, route}) => {

    const[usuarios,setUsers] = useState({
        dni:"",
        nombre:"",
        apellidos:"",
        telefono:"",
        email:"",
        contraseña:"",
        rol:"",
    });

    const [value, setRol] = useState({
        value:""
     });
     const handleChangeRol= (value) => {
        setRol({value})   
      }
      const placeholderRol = {
        label: 'Seleccione Rol...',
        value: "nulo",
        color: '#9EA0A4',
      };

    useEffect(()=>{
        if(route.params && route.params.dni){  
          ( async () => {
            
            const usuario = await getUser(route.params.dni)
            setUsers({
              dni: usuario.dni,
              nombre: usuario.nombre,
              apellidos: usuario.apellidos,
              telefono: usuario.telefono,
              email: usuario.email,
              contraseña: usuario.contraseña,
              rol: usuario.rol,
            
            })        
          })();
        }
      }, []);


    const handleChange= (name, value) => setUsers({...usuarios, [name]:value,})

  const handleSubmit = () => {

    usuarios.rol=value.value
    console.log(usuarios)
    var resultado = editarUsuario(route.params.dni,usuarios)
    if(resultado.includes("Exito")){
      navigation.navigate('ListadoUsers')
      }
      else{
        alert(resultado);
      }
    
    
  }
    

  return (
    <View style={{alignItems: 'center',
  justifyContent: 'center',
  textAlign:'left',}}>

    <View style={{flex: 1,flexDirection: 'row',flexWrap: 'wrap',alignItems: 'flex-start', justifyContent: 'center'}}>
      
      <View style={{ width: '100%', marginTop:50 }}>

        <Text style={{fontWeight: 'bold'}}>DNI: </Text>
        <TextInput style={styles.input}
          placeholder='DNI'
          onChangeText={text => handleChange('dni', text)}
          value={usuarios.dni}/>

          <Text style={{fontWeight: 'bold'}}>Nombre: </Text>
          <TextInput style={styles.input}
          placeholder='Nombre'
          onChangeText={text => handleChange('nombre', text)}
          value={usuarios.nombre}/>

          <Text style={{fontWeight: 'bold'}}>Apellidos: </Text>
          <TextInput style={styles.input}
          placeholder='Apellidos'
          onChangeText={text => handleChange('apellidos', text)}
          value={usuarios.apellidos}/>
          
          <Text style={{fontWeight: 'bold'}}>Teléfono: </Text>
          <TextInput style={styles.input}
          placeholder='Teléfono'
          onChangeText={text => handleChange('telefono', text)}
          value={usuarios.telefono}/>

          <Text style={{fontWeight: 'bold'}}>Email: </Text>
          <TextInput style={styles.input}
          placeholder='Email'
          onChangeText={text => handleChange('email', text)}
          value={usuarios.email}/>

          <Text style={{fontWeight: 'bold'}}>Contraseña: </Text>
          <TextInput style={styles.input}
          placeholder='Contraseña'
          onChangeText={text => handleChange('contraseña', text)}
          value={usuarios.contraseña}/>


          <Text style={{fontWeight: 'bold'}}>Seleccionar Rol: </Text>
          <RNPickerSelect
                    placeholder={placeholderRol}
                    value={usuarios.rol}
                          onValueChange={(value) => handleChangeRol(value)}
                          style={{
                            inputWeb: {
                              width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
                            },
                            inputIOS:{
                              width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
                            },
                            inputAndroid:{
                              width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
                            }
                          }}
                          items={[
                              { label: "Usuario", value: "usuario", },
                              { label: "Administrador", value: "administrador" },
                              
                          ]}
                      />
          
      </View>
      
      
        <Row>

        
      <View style={{width: '100%'}}>
      <TouchableOpacity style={styles.ButtonSave} onPress={handleSubmit}>
        <FontAwesome5 name="user-edit" size={24} color="black" />
        <Text styles={{fontWeight: 'bold', marginLeft:4}}>Modificar Usuario</Text>
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
      marginTop:5,
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

export default UpdateUsers