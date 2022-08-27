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
import swal from 'sweetalert'



const UpdateInjertos = ({navigation, route}) => {
  
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
  acierto:""

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
      const result = await getInjerto(route.params.id)
      var mensaje = result.message;
      var injertos = result.injerto;
      if(mensaje.includes("Exito")){
            
      if(injertos.hta == "Si"){
        var hta = "True"
      }
      else{
        var hta = "False"
      }
      if(injertos.dm == "Si"){
        var dm = "True"
      }
      else{
        var dm = "False"
      }
      if(injertos.dlp == "Si"){
        var dlp = "True"
      }
      else{
        var dlp = "False"
      }
      if(injertos.apm == "Si"){
        var apm = "True"
      }
      else{
        var apm = "False"
      }
      if(injertos.apq == "Si"){
        var apq = "True"
      }
      else{
        var apq = "False"
      }
      if(injertos.acvhc == "Si"){
        var acvhc = "True"
      }
      else{
        var acvhc = "False"
      }
      if(injertos.acvhbc == "Si"){
        var acvhbc = "True"
      }
      else{
        var acvhbc = "False"
      }
      if(injertos.aminas == "Si"){
        var aminas = "True"
      }
      else{
        var aminas = "False"
      }
      if(injertos.ecografia == "Normal"){
        var ecografia = "Normal"
      }
      else if(injertos.ecografia == "Patológica"){
        var ecografia = "Patológica"
      }
      else{
        var ecografia = "No realizada"
      }
      setInjertos({
        edad: injertos.edad,
        sexo: injertos.sexo,
        imc: injertos.imc,
        hta: hta,
        dm: dm,
        dlp: dlp,
        apm: apm,
        apq: apq,
        got: injertos.got,
        gpt: injertos.gpt,
        ggt: injertos.ggt,
        na: injertos.na,
        bbt: injertos.bbt,
        acvhc: acvhc,
        acvhbc: acvhbc,
        aminas: aminas, 
        dosisna: injertos.dosisna,
        ecografia: ecografia,
        acierto: injertos.acierto
      })}
      else{
        swal("Ha habido un error", mensaje, "error");
      }
      
    })();
  }
}, []);
const handleChange= (name, value) => setInjertos({...injertos, [name]:value,})


const handleSubmit = async () =>{
  try {
  injertos.sexo=value.value
  
  console.log(injertos)
  const result = await editarInjerto(route.params.id,injertos)
    
    if(result.includes("Exito") && localStorage.getItem("rol")=="usuario" ){
      swal("Enhorabuena", result, "success");
      navigation.navigate('HomeScreenUsuario');
    }else if(result.includes("Exito") && localStorage.getItem("rol")=="administrador"){
      swal("Enhorabuena", result, "success");
      navigation.navigate('HomeScreen');
    }
    else{
      swal("Ha habido un error", result, "error");
    }
    
  } catch (error) {
    console.log(error);
  }
  
  }


 if(injertos.hta == "True"){
  var valorhta = "Si"
}
else{
  var valorhta = "No"
}
if(injertos.dm == "True"){
  var valordm = "Si"
}
else{
  var valordm = "No"
}
if(injertos.dlp == "True"){
  var valordlp = "Si"
}
else{
  var valordlp = "No"
}
if(injertos.apm == "True"){
  var valorapm = "Si"
}
else{
  var valorapm = "No"
}
if(injertos.apq == "True"){
  var valorapq = "Si"
}
else{
  var valorapq = "No"
}
if(injertos.acvhc == "True"){
  var valoracvhc = "Si"
}
else{
  var valoracvhc = "No"
}
if(injertos.acvhbc == "True"){
  var valoracvhbc = "Si"
}
else{
  var valoracvhbc = "No"
}
if(injertos.aminas == "True"){
  var valoraminas = "Si"
}
else{
  var valoraminas = "No"
}
if(injertos.acierto == "True"){
  var valoracierto = "Si"
}
else{
  var valoracierto = "No"
}


  
  

  

  return (
    
    <View style={{alignItems: 'center', backgroundColor: 'white', width: '100%', height: '100%'}}>

<Row>
    <Container style={{backgroundColor: 'white', 
    marginTop: '10px',
    borderRadius:10,
    fontSize:20, 
    padding:10,
    textAlign: 'center',
    }}>Rellene todos los campos para poder añadir modificar correctamente un Injerto.</Container>
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
      value={injertos.edad}/>
  </View>

  <View>
  <Text style={styles.texto}>
    IMC:
  </Text>
  <TextInput style={styles.input}
    placeholder='IMC'
    onChangeText={text => handleChange('imc', text)}
   value={injertos.imc}/>
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
    value={injertos.gpt}/>
  </View>

  <View>
  <Text style={styles.texto}>
    GGT: 
  </Text>
    <TextInput style={styles.input}
    placeholder='GGT'
    onChangeText={text => handleChange('ggt', text)}
    value={injertos.ggt}/>
  </View>

  <View>
  <Text style={styles.texto}>
    NA: 
  </Text>
    <TextInput style={styles.input}
    placeholder='NA'
    onChangeText={text => handleChange('na', text)}
    value={injertos.na}/>
  </View>

  <View>
  <Text style={styles.texto}>
    BBT:
  </Text>
    <TextInput style={styles.input}
    placeholder='BBT'
    onChangeText={text => handleChange('bbt', text)}
    value={injertos.bbt}/>
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
      value={injertos.got}/>
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
    value={injertos.dosisna}/>
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
  <View>
  <Text style={styles.texto}>
    ACIERTO: {valoracierto}
  </Text>
  
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('acierto', value)}
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