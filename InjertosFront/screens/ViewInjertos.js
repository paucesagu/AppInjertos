import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getInjerto } from "../api"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AntDesign } from '@expo/vector-icons';
import {predecir} from "../api"


const ViewInjertos = ({navigation, route}) => {
  //console.log(localStorage.getItem('rol'));
  //Estados
const [injertos,setInjertos]= useState({
  edad:"",
  sexo:"", 
  imc:"",
  hta:"",
  dm:"",
  dlp:"",
  apm:"",
  apq:"",
  got:"",
  gpt:"",
  ggt:"",
  na:"",
  bbt:"",
  acvhc:"",
  acvhbc:"",
  aminas:"",
  dosisna:"",
  ecografia:"",
  fecha:"",
  valido:"",

});


  useEffect(()=>{
    if(route.params && route.params.id){  
      ( async () => {
        const injertos = await getInjerto(route.params.id)
        console.log(injertos)
        setInjertos({
          edad: injertos.edad,
          sexo: injertos.sexo,
          imc: injertos.imc,
          hta: injertos.hta,
          dm: injertos.dm,
          dlp: injertos.dlp,
          apm: injertos.apm,
          apq: injertos.apq,
          got: injertos.got,
          gpt: injertos.gpt,
          ggt: injertos.ggt,
          na: injertos.na,
          bbt: injertos.bbt,
          acvhc: injertos.acvhc,
          acvhbc: injertos.acvhbc,
          aminas: injertos.aminas, 
          dosisna: injertos.dosisna,
          ecografia: injertos.ecografia,
          fecha: injertos.fecha,
          valido: injertos.validez,
        })
       
        
        
      })();
    }
  }, []);
  

  const handleVolver = () => {
    navigation.navigate('HomeScreen')
  }

  const handleSubmit = () => {
    const resultado = predecir(route.params.id)
   console.log(resultado)
       //aqui habria que mandarlo a la pagina con los detalles del injerto
    
  }

  const getBackgroundColor = () => {
 
    let color;
    if(injertos.valido == "Válido"){
      color ="#00a135"
    }
    else{
      color="#ff0000"
    }
    return color
  }

  return (
    <View style={{alignItems: 'center'}}>
      <Row>
        <TouchableOpacity style={styles.ButtonSave} onPress={handleSubmit}>
        <Text styles={{fontWeight: 'bold'}}>Validar Injerto</Text>
      </TouchableOpacity>
      </Row>
        

    <Row style={{display:'flex'}}>
      <Col md={6} style={{display:'grid'}}>

      <Text style={styles.texto}>
        Edad:
      </Text>
        <TextInput style={styles.input}
          placeholder='Edad'
          editable = {false}
          value={injertos.edad}/>

      <Text style={styles.texto}>
        IMC:
      </Text>
      <TextInput style={styles.input}
        placeholder='IMC'
        editable = {false}
        value={injertos.imc}/>

      <Text style={styles.texto}>
        HTA:
      </Text>
      <TextInput style={styles.input}
        placeholder='HTA'
        editable = {false}
        value={injertos.hta}/>

      <Text style={styles.texto}>
        DM:
      </Text>
        <TextInput style={styles.input}
          placeholder='DM'
          editable = {false}
          value={injertos.dm}/>

      <Text style={styles.texto}>
        GPT:
      </Text>
        <TextInput style={styles.input}
        placeholder='GPT'
        editable = {false}
        value={injertos.gpt}/>

      <Text style={styles.texto}>
        GGT:
      </Text>
        <TextInput style={styles.input}
        placeholder='GGT'
        editable = {false}
        value={injertos.ggt}/>

      <Text style={styles.texto}>
        NA:
      </Text>
        <TextInput style={styles.input}
        placeholder='NA'
        editable = {false}
        value={injertos.na}/>

      <Text style={styles.texto}>
        BBT:
      </Text>
        <TextInput style={styles.input}
          placeholder='BBT'
          editable = {false}
          value={injertos.bbt}/>
      <Text style={styles.texto}>
              DLP:
      </Text>
        <TextInput style={styles.input}
          placeholder='DLP'
          editable = {false}
          value={injertos.dlp}/>

      </Col>
      
    
    <Col md={6} style={{display:'grid', marginLeft:10}}>
      

    <Text style={styles.texto}>
        Sexo:
      </Text>
        <TextInput style={styles.input}
          placeholder='sexo'
          value={injertos.sexo}
          editable = {false}/>
      <Text style={styles.texto}>
        APM:
      </Text>
        <TextInput style={styles.input}
          placeholder='APM'
          editable = {false}
          value={injertos.apm}/>
        
      <Text style={styles.texto}>
        APQ:
      </Text>
        <TextInput style={styles.input}
          placeholder='APQ'
          editable = {false}
          value={injertos.apq}/>

      <Text style={styles.texto}>
        GOT:
      </Text>
        <TextInput style={styles.input}
          placeholder='GOT'
          editable = {false}
          value={injertos.got}/>

      <Text style={styles.texto}>
        ACVHC:
      </Text>
        <TextInput style={styles.input}
          placeholder='ACVHC'
          editable = {false}
          value={injertos.acvhc}/>

      <Text style={styles.texto}>
        ACVHBC:
      </Text>
        <TextInput style={styles.input}
          placeholder='ACVHBC'
          editable = {false}
          value={injertos.acvhbc}/>

      <Text style={styles.texto}>
        AMINAS:
      </Text>
        <TextInput style={styles.input}
          placeholder='AMINAS'
          editable = {false}          
          value={injertos.aminas}/>

      <Text style={styles.texto}>
        DOSIS:
      </Text>
        <TextInput style={styles.input}
          placeholder='DOSIS'
          editable = {false}
          value={injertos.dosisna}/>

         <Text style={styles.texto}>
        Fecha:
      </Text>
        <TextInput style={styles.input}
          placeholder='DOSIS'
          editable = {false}
          value={injertos.fecha}/>

    </Col>
    </Row>
    <Row style={{display: 'grid'}}>
      <Col style={{display:'contents'}}>    
      <Text style={styles.texto}>
        Válido:
      </Text>
        <TextInput style={{backgroundColor:getBackgroundColor(injertos.valido), width:'100%',
        fontSize:15,
        marginBottom:7,
        borderWidth: 1,
        borderColor:'#9af88c',
        height:30,
        textAlign: 'center',
        padding: 4,
        borderRadius:5,
        flex: 1,
        color: 'white'}}
          placeholder='Válido'
          editable = {false}
          value={injertos.valido}/>

      <TouchableOpacity style={styles.ButtonSave} onPress={handleVolver}>
      <AntDesign name="back" size={30} color="black" /> <Text styles={{fontWeight: 'bold'}}>Volver</Text>
      </TouchableOpacity>   
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
    paddingTop:10,
    paddingBottom:10,
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
    marginLeft:10,
  }
})

export default ViewInjertos