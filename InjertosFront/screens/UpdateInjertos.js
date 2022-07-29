import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {getInjerto} from "../api"
import {editarInjerto} from "../api"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SwitchSelector from "react-native-switch-selector";
import RNPickerSelect from "react-native-picker-select";
import Container from 'react-bootstrap/Container';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'



const UpdateInjertos = ({navigation, route}) => {
  
//Estados
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
const placeholderSexo = {
  label: 'Seleccione un Género',
  value: "",
  color: '#9EA0A4',
};
const [value, setSexo] = useState({
  value:""
});
const handleChangeSexo= (value) => {setSexo({value})}




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
        })
        
      })();
    }
  }, []);
  const handleChange= (name, value) => setInjertos({...injertos, [name]:value,})


  const handleSubmit = async () =>{
    try {
    injertos.sexo=value.value
    
    const result = await editarInjerto(route.params.id,injertos)
      
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

    const getValue = () => {
 
      let color;
      var valor=injertos.hta;
      if(valor == 0){
        color ="0"        
      }
      else {
        color="1"
      }
      console.log(color)
      return color
    }

  

  return (
    
    <View style={{alignItems: 'center'}}>

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
    Edad: {injertos.edad}
  </Text>
    <TextInput style={styles.input}
      placeholder='Edad'
      onChangeText={text => handleChange('edad', text)}
      /*value={injertos.edad}*//>
  </View>

  <View>
  <Text style={styles.texto}>
    IMC: {injertos.imc}
  </Text>
  <TextInput style={styles.input}
    placeholder='IMC'
    onChangeText={text => handleChange('imc', text)}
   /* value={injertos.imc}*//>
  </View>

  <View>
  <Text style={styles.texto}>
    HTA: {injertos.hta}
  </Text>
  <SwitchSelector
                initial={0 }
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
    DM: {injertos.dm}
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
    GPT: {injertos.gpt}
  </Text>
    <TextInput style={styles.input}
    placeholder='GPT'
    onChangeText={text => handleChange('gpt', text)}
    /*value={injertos.gpt}*//>
  </View>

  <View>
  <Text style={styles.texto}>
    GGT: {injertos.ggt}
  </Text>
    <TextInput style={styles.input}
    placeholder='GGT'
    onChangeText={text => handleChange('ggt', text)}
    /*value={injertos.ggt}*//>
  </View>

  <View>
  <Text style={styles.texto}>
    NA: {injertos.na}
  </Text>
    <TextInput style={styles.input}
    placeholder='NA'
    onChangeText={text => handleChange('na', text)}
    /*value={injertos.na}*//>
  </View>

  <View>
  <Text style={styles.texto}>
    BBT: {injertos.bbt}
  </Text>
    <TextInput style={styles.input}
    placeholder='BBT'
    onChangeText={text => handleChange('bbt', text)}
    /*value={injertos.bbt}*//>
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
              value={injertos.sexo}
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
    DLP: {injertos.dlp}
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
    APM: {injertos.apm}
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
    APQ: {injertos.apq}
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
    GOT: {injertos.got}
  </Text>
    <TextInput style={styles.input}
      placeholder='GOT'
      onChangeText={text => handleChange('got', text)}
      /*value={injertos.got}*//>
  </View>

  <View>
  <Text style={styles.texto}>
    ACVHC: {injertos.acvhc}
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
    ACVHBC: {injertos.acvhbc}
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
    AMINAS: {injertos.aminas}
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
    DOSIS: {injertos.dosis}
  </Text>
    <TextInput style={styles.input}
    placeholder='DOSIS'
    onChangeText={text => handleChange('dosisna', text)}
    /*value={injertos.dosisna}*//>
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
        <Feather name="edit" size={30} color="black" /> <Text styles={{fontWeight: 'bold'}}>Editar Injerto</Text>
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
    width:'100q%',
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
    paddingTop:20,
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

export default UpdateInjertos