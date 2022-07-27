import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {getInjerto} from "../api"
import {editarInjerto} from "../api"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RNPickerSelect from "react-native-picker-select";
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
    var result = await editarInjerto(route.params.id,injertos)
      
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

  return (
    
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
          HTA:
        </Text>
        <TextInput style={styles.input}
          placeholder='HTA'
          onChangeText={text => handleChange('hta', text)}
          value={injertos.hta}/>
        </View>

        <View>
        <Text style={styles.texto}>
          DM:
        </Text>
          <TextInput style={styles.input}
            placeholder='DM'
            onChangeText={text => handleChange('dm', text)}
            value={injertos.dm}/>
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
        <Text style={styles.texto}>
          DLP:
        </Text>
          <TextInput style={styles.input}
            placeholder='DLP'
            onChangeText={text => handleChange('dlp', text)}
            value={injertos.dlp}/>
        </View>

        <View>
        <Text style={styles.texto}>
          APM:
        </Text>
          <TextInput style={styles.input}
            placeholder='APM'
            onChangeText={text => handleChange('apm', text)}
            value={injertos.apm}/>
        </View>

        <View>
        <Text style={styles.texto}>
          APQ:
        </Text>
          <TextInput style={styles.input}
            placeholder='APQ'
            onChangeText={text => handleChange('apq', text)}
            value={injertos.apq}/>
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
          ACVHC:
        </Text>
          <TextInput style={styles.input}
          placeholder='ACVHC'
          onChangeText={text => handleChange('acvhc', text)}
          value={injertos.acvhc}/>
        </View>

        <View>
        <Text style={styles.texto}>
          ACVHBC:
        </Text>
          <TextInput style={styles.input}
          placeholder='ACVHBC'
          onChangeText={text => handleChange('acvhbc', text)}
          value={injertos.acvhbc}/>
        </View>

        <View>
        <Text style={styles.texto}>
          AMINAS:
        </Text>
          <TextInput style={styles.input}
          placeholder='AMINAS'
          onChangeText={text => handleChange('aminas', text)}
          value={injertos.aminas}/>
        </View>

        <View>
        <Text style={styles.texto}>
          DOSIS:
        </Text>
          <TextInput style={styles.input}
          placeholder='DOSIS'
          onChangeText={text => handleChange('dosisna', text)}
          value={injertos.dosisna}/>
        </View>

      </Col>
      </Row>
      <Row >
        
        <Col>
        <View>
        <Text style={{fontWeight: 'bold'}}>
          Género:
        </Text>
          <RNPickerSelect
            placeholder={placeholderSexo}
                  value={injertos.sexo}
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
        <Text style={{fontWeight: 'bold'}}>
          Ecografía:
        </Text>

        <RNPickerSelect
            placeholder={placeholderEco}
                  onValueChange={(valueEco) => handleChangeEcografia(valueEco)}
                  value={injertos.ecografia}
                  style={{
                    inputWeb: {
                      width:'100%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
                    },
                    inputIOS:{
                      width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
                    },
                    inputAndroid:{
                      width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
                    }
                  }}
                  items={[
                      { label: "Normal", value: "Normal" },
                      { label: "Patológica", value: "Patológica" },
                      { label: "No Realizada", value: "No realizada" },              
        ]}/>
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