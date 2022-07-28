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
const placeholderSexo = {
  label: 'Seleccione un Género',
  value: "",
  color: '#9EA0A4',
};
const [value, setSexo] = useState({
  value:""
});
const handleChangeSexo= (value) => {setSexo({value})}

const placeholderEco = {
  label: 'Tipo de Ecografía...',
  value: "",
  color: '#9EA0A4',
};

const [valueEco, setEcografia] = useState({
  valueEco:""
});


const handleChangeEcografia= (valueEco) => {
  setEcografia({valueEco})
} 

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
    injertos.ecografia=valueEco.valueEco
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
      if(injertos.hta == "No"){
        color =0
      }
      else {
        color=1
      }
      console.log(color)
      return color
    }

    console.log(getValue())

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
    value={injertos.imc}
    />
  </View>

  <View>
  <Text style={styles.texto}>
    HTA:
  </Text>
  <SwitchSelector
                initial={getValue(injertos.hta)}
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
    DM:
  </Text>
  <SwitchSelector
                initial={1}
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
    value={injertos.gpt}
    />
  </View>

  <View>
  <Text style={styles.texto}>
    GGT:
  </Text>
    <TextInput style={styles.input}
    placeholder='GGT'
    onChangeText={text => handleChange('ggt', text)}
    value={injertos.ggt}
    />
  </View>

  <View>
  <Text style={styles.texto}>
    NA:
  </Text>
    <TextInput style={styles.input}
    placeholder='NA'
    onChangeText={text => handleChange('na', text)}
    value={injertos.na}
    />
  </View>

  <View>
  <Text style={styles.texto}>
    BBT:
  </Text>
    <TextInput style={styles.input}
    placeholder='BBT'
    onChangeText={text => handleChange('bbt', text)}
    value={injertos.bbt}
    />
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
    DLP:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('dlp', value)}
                value={injertos.dlp}
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
    APM:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('apm', value)}
                value={injertos.apm}
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
    APQ:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('apq', value)}
                value={injertos.apq}
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
      value={injertos.got}
      />
  </View>

  <View>
  <Text style={styles.texto}>
    ACVHC:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('acvhc', value)}
                value={injertos.acvhc}
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
    ACVHBC:
  </Text>
  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('acvhbc', value)}
                value={injertos.acvhbc}
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
    AMINAS:
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
    value={injertos.dosisna}
    />
  </View>

  <View>
  <Text style={{fontWeight: 'bold'}}>
    Ecografía:
  </Text>

  <SwitchSelector
                initial={0}
                onPress={(value) => handleChange('ecografia', value)}
                value={injertos.ecografia}
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

export default UpdateInjertos