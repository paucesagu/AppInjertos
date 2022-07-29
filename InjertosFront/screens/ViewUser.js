import { View, TextInput, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getUser } from "../api"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AntDesign } from '@expo/vector-icons';
import swal from 'sweetalert'

const ViewUser = ({navigation, route}) => {

    const[usuarios,setUsers] = useState({
        dni:"",
        nombre:"",
        apellidos:"",
        telefono:"",
        email:"",
        contraseña:"",
        rol:"",
    });

    useEffect(()=>{
        if(route.params && route.params.dni){  
          ( async () => {
            
            const result = await getUser(route.params.dni)
            var mensaje = result.message;
      var usuario = result.result2;
      if(mensaje.includes("Exito")){
            console.log(usuario)
            setUsers({
              dni: usuario.dni,
              nombre: usuario.nombre,
              apellidos: usuario.apellidos,
              telefono: usuario.telefono,
              email: usuario.email,
              contraseña: usuario.contraseña,
              rol: usuario.rol,
            
            })
           

            
            
         }else{
          swal("Ha habido un error", mensaje, "error");
         } })();
        }
      }, []);

    
      const handleVolver = () => {
        navigation.navigate('ListadoUsers')
      }
      const handleEditar = () => {
    
        navigation.navigate('UpdateUsers', {dni: usuarios.dni})
        }
    

  return (
    <View style={{alignItems: 'center'}}>

    <Row style={{display:'flex'}}>
      <Col md={6} style={{display:'grid'}}>

      <Text style={styles.texto}>
        DNI:
      </Text>
        <TextInput style={styles.input}
          placeholder='DNI'
          editable = {false}
          value={usuarios.dni}/>

      <Text style={styles.texto}>
        Nombre:
      </Text>
      <TextInput style={styles.input}
        placeholder='NOMBRE'
        editable = {false}
        value={usuarios.nombre}/>

      <Text style={styles.texto}>
        Apellidos:
      </Text>
      <TextInput style={styles.input}
        placeholder='APELLIDOS'
        editable = {false}
        value={usuarios.apellidos}/>

      <Text style={styles.texto}>
        Teléfono:
      </Text>
        <TextInput style={styles.input}
          placeholder='TELÉFONO'
          editable = {false}
          value={usuarios.telefono}/>

      <Text style={styles.texto}>
        Contraseña:
      </Text>
        <TextInput style={styles.input}
        placeholder='CONTRASEÑA'
        editable = {false}
        value={usuarios.contraseña}/>

      <Text style={styles.texto}>
        ROL:
      </Text>
        <TextInput style={styles.input}
        placeholder='ROL'
        editable = {false}
        value={usuarios.rol}/>

      </Col>
      </Row>
      <Row>
        <TouchableOpacity style={styles.ButtonSave} onPress={handleVolver}>
        <AntDesign name="back" size={30} color="black" /> <Text styles={{fontWeight: 'bold'}}>Volver</Text>
        </TouchableOpacity> 
        
      </Row>
      <Button
  onPress={handleEditar}
  title="Editar"
  color="#fc9303"
/>
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

export default ViewUser