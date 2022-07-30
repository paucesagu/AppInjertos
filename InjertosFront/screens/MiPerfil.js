import { View, TextInput, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getUser } from "../api"
import { editarUsuario } from "../api"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AntDesign } from '@expo/vector-icons';
import swal from 'sweetalert'
import { FontAwesome5 } from '@expo/vector-icons';

const MiPerfil = ({navigation, route}) => {

  var userDNI = localStorage.getItem('userDNI');
  console.log(userDNI);

    const[usuarios,setUsers] = useState({
        dni:"",
        nombre:"",
        apellidos:"",
        telefono:"",
        email:"",
        rol:"",
    });
    console.log(route.params.dni)
    useEffect(()=>{
        
          ( async () => {
            
            const result = await getUser(userDNI)
            var mensaje = result.message;
            console.log(result);
      var usuario = result.result2;
      if(mensaje.includes("Exito")){
            console.log(usuario)
            setUsers({
              dni: usuario.dni,
              nombre: usuario.nombre,
              apellidos: usuario.apellidos,
              telefono: usuario.telefono,
              email: usuario.email,
              rol: usuario.rol,
            
            })
           

            
            
         }else{
          swal("Ha habido un error", mensaje, "error");
         } })();
        }
      , []);

    var rol = localStorage.getItem("rol");
      const handleVolver = () => {
        if(rol ==  "administrador"){
          navigation.navigate('HomeScreen')
        }
        else{
          navigation.navigate('HomeScreenUsuario')
        }
        
      }
      const handleChange= (name, value) => setUsers({...usuarios, [name]:value,})

      const handleEditar = async () => {
    console.log(usuarios)
        const resultado = await editarUsuario(userDNI,usuarios)
      console.log(resultado)
      if(resultado.includes("Exito")){
        swal("Enhorabuena", resultado, "success");
        }
        else{
          swal("Ha habido un error", resultado, "error");
        }
        }
      const handleModificarContraseña = () => {

        
          navigation.navigate('ModificarContraseña', {dni: usuarios.dni});
          }
    
  return (
    <View style={{alignItems: 'center', backgroundColor: 'white', width: '100%', height: '100%'}}>

    <Row style={{display:'flex'}}>
      <Col md={6} style={{display:'grid'}}>

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
      <Row> 
        <View style={{width: '100%'}}>
        <TouchableOpacity style={styles.ButtonSave} onPress={handleEditar}>
          <FontAwesome5 name="user-edit" size={24} color="black" />
          <Text styles={{fontWeight: 'bold', marginLeft:4}}>Editar</Text>
        </TouchableOpacity>
        </View>
        </Row>
        <Row> 
        <View style={{width: '100%'}}>
        <TouchableOpacity style={styles.ButtonDelete} onPress={handleModificarContraseña}>
          <FontAwesome5 name="edit" size={24} color="black" />
          <Text styles={{fontWeight: 'bold', marginLeft:4}}>Modificar contraseña</Text>
        </TouchableOpacity>
        </View>
        </Row>
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
    ButtonDelete: {
      marginTop:5,
      padding:20,
      borderRadius:10,
      marginBottom:3,
      backgroundColor:'orange',
      width:'100%',
      textAlign:'center',
      display: 'block', 
      color:"white",
    },
    ButtonText:{
      fontWeight:'bold',
    },
    texto:{
      fontWeight: 'bold',
    }
  })

export default MiPerfil