import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import {crearUsuario} from "../api"
//import 'bootstrap/dist/css/bootstrap.min.css'
//import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RNPickerSelect from "react-native-picker-select";
import { AntDesign  } from '@expo/vector-icons';
import swal from 'sweetalert'

const NewUser = ({navigation, route}) => {

    const[usuarios,setUsers] = useState({
        dni:"",
        nombre:"",
        apellidos:"",
        telefono:"",
        email:"",
        contraseña:"",
        rol:"",
    });

     //Obtener valor de Rol del SELECT
     const [value, setRol] = useState({
        value:""
     });
     const handleChangeRol= (value) => {
    
        setRol({value})
    
      }
      const placeholderRol = {
        label: 'Seleccione Rol...',
        value: "",
        color: '#9EA0A4',
      };

      //AÑADIR Usuario 
  const handleChange= (name, value) => setUsers({...usuarios, [name]:value,})

  const handleSubmit = async () => {
    console.log(usuarios)

    usuarios.rol=value.value
    console.log(usuarios.rol)
    const resultado = await crearUsuario(usuarios)
    console.log(resultado)
    if(resultado.includes("Exito")){
      swal("Enhorabuena", resultado, "success");
      navigation.navigate('ListadoUsers')
      }
      else{
        swal("Ha habido un error", resultado, "error");
      }
    
   
  }

  return (
    <View style={{alignItems: 'center',
  justifyContent: 'center',
  textAlign:'left',backgroundColor: 'white',width: '100%', height: '100%'}}>
    <Row>
    <Container style={{backgroundColor: 'white', 
    marginTop: '10px',
    borderRadius:10,
    fontSize:20, 
    padding:10,
    textAlign: 'center',
    }}>Rellene todos los campos para poder añadir correctamente un Usuario.</Container>
    </Row>
    <View style={{flex: 1,flexDirection: 'row',flexWrap: 'wrap',alignItems: 'flex-start', justifyContent: 'center'}}>
      <View style={{ width: '100%', marginTop:50 }}>

          <TextInput style={styles.input}
          placeholder='DNI'
          onChangeText={text => handleChange('dni', text)}/>
          
          <TextInput style={styles.input}
          placeholder='Nombre'
          onChangeText={text => handleChange('nombre', text)}/>

          <TextInput style={styles.input}
          placeholder='Apellidos'
          onChangeText={text => handleChange('apellidos', text)}/>
          
          <TextInput style={styles.input}
          placeholder='Teléfono'
          onChangeText={text => handleChange('telefono', text)}/>

          <TextInput style={styles.input}
          placeholder='Email'
          onChangeText={text => handleChange('email', text)}/>

          <TextInput style={styles.input}
          placeholder='Contraseña'
          onChangeText={text => handleChange('contraseña', text)}/>

          <RNPickerSelect
          placeholder={placeholderRol}
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
                 
      <View style={{width: '100%', marginTop:10.}}>
      <TouchableOpacity style={styles.ButtonSave} onPress={handleSubmit}>
        <AntDesign name="adduser" size={36} color="black" />
        <Text styles={{fontWeight: 'bold'}}>Añadir Usuario</Text>
      </TouchableOpacity>
      </View>
    </View>
    </View>
  )
  
}

const styles = StyleSheet.create({
    input:{
      width:'95%',
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
      paddingTop:10,
      paddingBottom:10,
      borderRadius:10,
      marginBottom:3,
      backgroundColor:'#9af88c',
      width:'100%',
      textAlign:'center',
      
    },
    ButtonText:{
      fontWeight:'bold',
    }
    
    
  })

export default NewUser