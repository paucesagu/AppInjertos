import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {crearInjerto} from "../api"
import { Ionicons } from '@expo/vector-icons';//import 'bootstrap/dist/css/bootstrap.min.css'
//import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SwitchSelector from "react-native-switch-selector";
import RNPickerSelect from "react-native-picker-select";


const AddInjertos = ({navigation, route}) => {

  

  const [injertos,setInjertos]= useState({
    "edad":"",
    "sexo":"", 
    "imc":"",
    "hta":"True",
    "dm":"True",
    "dlp":"True",
    "apm":"True",
    "apq":"True",
    "got":"",
    "gpt":"",
    "ggt":"",
    "na":"",
    "bbt":"",
    "acvhc":"True",
    "acvhbc":"True",
    "aminas":"True",
    "dosisna":"",
    "ecografia":"Normal",

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
      navigation.navigate('HomeScreenUsuario');
    }else if(localStorage.getItem("rol")=="administrador"){
      navigation.navigate('HomeScreen');
    }
    
  }
  useEffect(()=>{
    if(route.params && route.params.id){
      navigation.setOptions({headerTitle:'Modificando pantalla'})

    }
  }, [])

  

  
  return (
  
  
  <View style={{alignItems: 'center',
  justifyContent: 'center',
  textAlign:'left',}}>
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
      onChangeText={text => handleChange('edad', text)}/>
  </View>

  <View>
  <Text style={styles.texto}>
    IMC:
  </Text>
  <TextInput style={styles.input}
    placeholder='IMC'
    onChangeText={text => handleChange('imc', text)}/>
  </View>

  <View>
  <Text style={styles.texto}>
    HTA:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('hta', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
    DM:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('dm', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
    onChangeText={text => handleChange('gpt', text)}/>
  </View>

  <View>
  <Text style={styles.texto}>
    GGT:
  </Text>
    <TextInput style={styles.input}
    placeholder='GGT'
    onChangeText={text => handleChange('ggt', text)}/>
  </View>

  <View>
  <Text style={styles.texto}>
    NA:
  </Text>
    <TextInput style={styles.input}
    placeholder='NA'
    onChangeText={text => handleChange('na', text)}/>
  </View>

  <View>
  <Text style={styles.texto}>
    BBT:
  </Text>
    <TextInput style={styles.input}
    placeholder='BBT'
    onChangeText={text => handleChange('bbt', text)}/>
  </View>
  </Col>
  

<Col md={6} style={{display:'grid', marginLeft:10}}>
   <View>
    <Text style={{fontWeight: 'bold'}}>
      Género:
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
    DLP:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('dlp', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
    APM:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('apm', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
    APQ:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('apq', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
      onChangeText={text => handleChange('got', text)}/>
  </View>

  <View>
  <Text style={styles.texto}>
    ACVHC:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('acvhc', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
    ACVHBC:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('acvhbc', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
    AMINAS:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('aminas', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
    onChangeText={text => handleChange('dosisna', text)}/>
  </View>

  <View>
  <Text style={{fontWeight: 'bold'}}>
    Ecografía:
  </Text>

  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('ecografia', value)}

                textColor='#7a44cf'
                selectedColor='#9af88c'
                buttonColor='#FFFFFF'
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
  }
  
  
})

/*<div>
<select id="fruits" defaultValue="Elegir Sexo"
        onChange={() => handleChange('sexo', {fruit})} style={dropdown.text}>
  <option value="masculino">Masculino</option>
  <option value="femenino">Femenino</option>
</select>
</div>*/ 

export default AddInjertos