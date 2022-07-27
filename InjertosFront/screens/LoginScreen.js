import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { login } from "../api"
import { AntDesign } from '@expo/vector-icons'
import { TextField } from '@mui/material';


const LoginScreen = ({navigation}) => {


  const[body , setBody] = useState({dni: '', contraseña: ''})

  const inputChange = ({ target }) => {
    const { name , value} = target
    setBody({
      ...body,
      [name]: value
    })
  }




const onSubmit = async () =>{
  try {
    
    const result = await login(body);
    if(result.includes("Exito") && localStorage.getItem("rol")=="usuario" ){
      navigation.navigate('HomeScreenUsuario');
    }else if(result.includes("Exito") && localStorage.getItem("rol")=="administrador"){
      navigation.navigate('HomeScreen');
    }
    else{
      alert(result);
    }
    
    
  } catch (error) {
    console.log(error);
  }
  
  }

   useEffect(function () {
        
     })
      
   return (
      <View style={{backgroundColor: '#fff',flex: 1,}}>
        <View style={styles.container}>
          <View style={styles.formulario}>
            <Text style={styles.nombre}> <strong>Introduzca DNI: </strong></Text>
  
            <View style={styles.item}>
                <AntDesign style={styles.imagen} name="user" size={35} color="black" />
                <TextField  fullWidth value={body.dni} onChange={inputChange} name='dni' style={{obscureText:true, width:250, backgroundColor: 'white'}}/>
                
            </View>
  
            <Text style={styles.nombre}> <strong>Introduzca Contraseña: </strong></Text>
  
            <View style={styles.item}>
                <AntDesign style={styles.imagen} name="lock" size={35} color="black" />
                <TextField type='password' fullWidth value={body.contraseña} onChange={inputChange} name='contraseña' style={{obscureText:true, width:250, backgroundColor: 'white'}}  />

            </View>
            
            <Button style={styles.iniciar} title='Iniciar Sesión' backgroundColor='red' onPress={onSubmit}/>
  
          </View>
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: '40px',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowRadius: 0,
      shadowColor: 'transparent'
    },
    icon: {
      padding: 5,
      paddingLeft: 10,
      marginTop: 5
    },
    input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      marginTop: 20,
      marginBottom: 30,
      marginLeft: 10,
      width: 200
    },
    formulario: {
      alignItems: 'center',
      backgroundColor: '#eee',
      borderStyle: 2,
      borderColor: 'black',
      shadowRadius: 5,
      shadowColor: '#69c269',
      height: 290,
      width: 330
    },
    nombre: {
      paddingTop: 10
    },
    item: {
      flexDirection: 'row',
      display: 'block'
      /* padding: 16,
      marginTop: 16,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: 'Dashed',
      borderRadius: 10 */
    },
    imagen: {
      textAlignVertical: 'center'
  
    },
    imagen2: {
      textAlignVertical: 'center'
  
    },
    iniciar: {
      backgroundColor: 'red'
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flow-root',
      textAlign: 'center',
      backgroundColor: '#77DD77',
      paddingBottom: 10
  
    },
    HeaderText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#333',
      letterSpacing: 1,
      marginTop: 3
    }
  })

export default LoginScreen

