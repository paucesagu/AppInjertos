import React from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const MiPerfil = () => {

  
  return (
    <View style={{alignItems: 'center',backgroundColor: 'white', width: '100%', height: '100%'}}>
       <Row style={{display:'flex'}}>
      <Col md={6} style={{display:'grid'}}>

      <Text style={styles.texto}>
        DNI:
      </Text>
        <TextInput style={styles.input}
          placeholder='DNI'
          editable = {false}
          />

      <Text style={styles.texto}>
        Nombre:
      </Text>
      <TextInput style={styles.input}
        placeholder='NOMBRE'
        editable = {false}
        />

      <Text style={styles.texto}>
        Apellidos:
      </Text>
      <TextInput style={styles.input}
        placeholder='APELLIDOS'
        editable = {false}
        />

      <Text style={styles.texto}>
        Teléfono:
      </Text>
        <TextInput style={styles.input}
          placeholder='TELÉFONO'
          editable = {false}
        />

      <Text style={styles.texto}>
        ROL:
      </Text>
        <TextInput style={styles.input}
        placeholder='ROL'
        editable = {false}
        />

      </Col>
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
    backgroundColor:'red',
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