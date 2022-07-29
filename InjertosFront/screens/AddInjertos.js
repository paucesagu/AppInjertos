import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import { useNavigation, DrawerActions } from '@react-navigation/native';

import {crearInjerto} from "../api"
import { Ionicons } from '@expo/vector-icons';//import 'bootstrap/dist/css/bootstrap.min.css'
//import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SwitchSelector from "react-native-switch-selector";
import RNPickerSelect from "react-native-picker-select";
import swal from 'sweetalert'
import HomeScreen from './HomeScreen';

const AddInjertos = ({navigation, route}) => {

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
  ecografia:""

  });

  //Obtener valor de SEXO del SELECT
  const [value, setSexo] = useState({
    value:null
  });
  
  const handleChangeSexo= (value) => {
    
    setSexo({value})

  }
  const placeholderSexo = {
    label: 'Seleccione Género...',
    value: "",
    color: '#9EA0A4',
  };


  //AÑADIR INJERTO 
  const handleChange= (name, value) => setInjertos({...injertos, [name]:value,})

  const handleSubmit = async () => {

    injertos.sexo=value.value
    console.log(injertos)

    var resultado = await crearInjerto(injertos)
    if(resultado.includes("Exito") && localStorage.getItem("rol")=="usuario" ){
      swal("Enhorabuena", resultado, "success");
      navigation.navigate('HomeScreenUsuario');
      
    }else if(resultado.includes("Exito") && localStorage.getItem("rol")=="administrador"){
      swal("Enhorabuena", resultado, "success");
      navigation.navigate('HomeScreen');
      //this.props.navigation.push('HomeScreen')

    }
    else{
      swal("Ha habido un error", resultado, "error");
    }
    
  }
  
  useEffect(()=>{
    if(route.params && route.params.id){
      navigation.setOptions({headerTitle:'Modificando pantalla'})

    }
  }, [])

  

  
 if(injertos.hta == "True"){
  var valorhta = "Si"
}
else if(injertos.hta == ""){
  var valorhta = ""
}
else{
  var valorhta = "No"
}
if(injertos.dm == "True"){
  var valordm = "Si"
}
else if(injertos.dm== ""){
  var valordm = ""
}
else{
  var valordm = "No"
}
if(injertos.dlp == "True"){
  var valordlp = "Si"
}
else if(injertos.dlp== ""){
  var valordlp = ""
}
else{
  var valordlp = "No"
}
if(injertos.apm == "True"){
  var valorapm = "Si"
}
else if(injertos.apm== ""){
  var valorapm = ""
}
else{
  var valorapm = "No"
}
if(injertos.apq == "True"){
  var valorapq = "Si"
}
else if(injertos.apq== ""){
  var valorapq = ""
}
else{
  var valorapq = "No"
}
if(injertos.acvhc == "True"){
  var valoracvhc = "Si"
}
else if(injertos.acvhc== ""){
  var valoracvhc = ""
}
else{
  var valoracvhc = "No"
}
if(injertos.acvhbc == "True"){
  var valoracvhbc = "Si"
}
else if(injertos.acvhbc= ""){
  var valoracvhbc = ""
}
else{
  var valoracvhbc = "No"
}
if(injertos.aminas == "True"){
  var valoraminas = "Si"
}
else if(injertos.aminas== ""){
  var valoraminas = ""
}
else{
  var valoraminas = "No"
}



  
  

  

  return (
    
    <View style={{alignItems: 'center',backgroundColor: 'white'}}>

<Row>
    <Container style={{backgroundColor: 'white', 
    marginTop: '10px',
    borderRadius:10,
    fontSize:20, 
    padding:10,
    textAlign: 'center',
    }}>Rellene todos los campos para poder añadir correctamente un Injerto.</Container>
    </Row>
    <View style={{alignItems: 'center'}}>

<Row style={{display:'flex'}}>
  
  <Col md={6} style={{display:'grid'}}>
  <View>
  <Text style={styles.texto}>
    Edad: 
  </Text>
    <TextInput style={styles.input}
      placeholder='Edad'
      onChangeText={text => handleChange('edad', text)}
      />
  </View>

  <View>
  <Text style={styles.texto}>
    IMC:
  </Text>
  <TextInput style={styles.input}
    placeholder='IMC'
    onChangeText={text => handleChange('imc', text)}
   />
  </View>

  <View>
  <Text style={styles.texto}>
    HTA: {valorhta}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('hta', value)}
                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Sí", value: "True" },
                  { label: "No", value: "False" },
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>

  <View>
  <Text style={styles.texto}>
    DM: {valordm}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('dm', value)}

                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Sí", value: "True" },
                  { label: "No", value: "False" },
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>

  <View>
  <Text style={styles.texto}>
    GPT: 
  </Text>
    <TextInput style={styles.input}
    placeholder='GPT'
    onChangeText={text => handleChange('gpt', text)}
    />
  </View>

  <View>
  <Text style={styles.texto}>
    GGT: 
  </Text>
    <TextInput style={styles.input}
    placeholder='GGT'
    onChangeText={text => handleChange('ggt', text)}
    />
  </View>

  <View>
  <Text style={styles.texto}>
    NA: 
  </Text>
    <TextInput style={styles.input}
    placeholder='NA'
    onChangeText={text => handleChange('na', text)}
    />
  </View>

  <View>
  <Text style={styles.texto}>
    BBT:
  </Text>
    <TextInput style={styles.input}
    placeholder='BBT'
    onChangeText={text => handleChange('bbt', text)}
    />
  </View>
  </Col>
  

<Col md={6} style={{display:'grid', marginLeft:10}}>
   <View>
    <Text style={{fontWeight: 'bold'}}>
      Género: {injertos.sexo}
    </Text>
      <RNPickerSelect
        placeholder={placeholderSexo}
              onValueChange={(value) => handleChangeSexo(value)}
              
              style={{
                inputWeb: {
                  width:'100%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,
                },
                inputIOS:{
                  width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
                },
                inputAndroid:{
                  width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
                }
              }}
              items={[
                  { label: "Masculino", value: "Masculino" },
                  { label: "Femenino", value: "Femenino" },            
      ]}/>
  </View>
  <View>
  <Text style={styles.texto}>
    DLP: {valordlp}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('dlp', value)}
                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Sí", value: "True" },
                  { label: "No", value: "False" },
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>
 

  <View>
  <Text style={styles.texto}>
    APM: {valorapm}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('apm', value)}
                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Sí", value: "True" },
                  { label: "No", value: "False" },
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>

  <View>
  <Text style={styles.texto}>
    APQ: {valorapq}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('apq', value)}
               
                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Sí", value: "True" },
                  { label: "No", value: "False" },
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>

  <View>
  <Text style={styles.texto}>
    GOT:
  </Text>
    <TextInput style={styles.input}
      placeholder='GOT'
      onChangeText={text => handleChange('got', text)}
      />
  </View>

  <View>
  <Text style={styles.texto}>
    ACVHC: {valoracvhc}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('acvhc', value)}
                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Sí", value: "True" },
                  { label: "No", value: "False" },
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>

  <View>
  <Text style={styles.texto}>
    ACVHBC: {valoracvhbc}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('acvhbc', value)}
                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Sí", value: "True" },
                  { label: "No", value: "False" },
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>

  <View>
  <Text style={styles.texto}>
    AMINAS: {valoraminas}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('aminas', value)}
                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Sí", value: "True" },
                  { label: "No", value: "False" },
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>

  

</Col>
</Row>
<Row >
  
  <Col>
 <View>
  <Text style={styles.texto}>
    DOSIS: 
  </Text>
    <TextInput style={styles.input}
    placeholder='DOSIS'
    onChangeText={text => handleChange('dosisna', text)}
    />
  </View>

  <View>
  <Text style={{fontWeight: 'bold'}}>
    Ecografía: {injertos.ecografia}
  </Text>

  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('ecografia', value)}
                textColor='#7a44cf'
                selectedColor='#FFFFFF'
                buttonColor='#9af88c'
                borderColor='#9af88c'
                hasPadding
                options={[
                  { label: "Normal", value: "Normal" },
                  { label: "Patológica", value: "Patológica" },
                  { label: "No Realizada", value: "No realizada" }, 
                ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"/>
  </View>
  <Row>

    <View>
        <TouchableOpacity style={styles.ButtonSave} onPress={handleSubmit}>
          <Ionicons name="add-circle-outline" size={30} color="black" /> <Text styles={{fontWeight: 'bold'}}>Añadir Injerto</Text>
        </TouchableOpacity>
  </View>
  
  </Row>  
  </Col> 
</Row>
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
  },
  texto:{
    fontWeight: 'bold',
    marginLeft:10,
  }
  
  
})


export default AddInjertos