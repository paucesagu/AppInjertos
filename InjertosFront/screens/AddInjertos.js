import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {crearInjerto} from "../api"
import { Calendar } from 'react-native-calendars'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RNPickerSelect from "react-native-picker-select";


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
    ecografia:"",
    fecha:"",

  });

  //Obtener valor de SEXO del SELECT
  const [value, setSexo] = useState({
    value:""
  });
  
  const handleChangeSexo= (value) => {
    
    setSexo({value})

  }
  const placeholderSexo = {
    label: 'Seleccione Género...',
    value: "",
    color: '#9EA0A4',
  };

  //Obtener valor de ECOGRAFIA del SELECT
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

  //AÑADIR INJERTO 
  const handleChange= (name, value) => setInjertos({...injertos, [name]:value,})

  const handleSubmit = async () => {

    injertos.sexo=value.value
    injertos.ecografia=valueEco.valueEco
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
    <View style={{flex: 1,flexDirection: 'row',flexWrap: 'wrap',alignItems: 'flex-start', justifyContent: 'center'}}>
      <View style={{ width: '50%', marginTop:50 }}>

          <TextInput style={styles.input}
          placeholder='Edad'
          onChangeText={text => handleChange('edad', text)}/>

          <RNPickerSelect
          placeholder={placeholderSexo}
                 onValueChange={(value) => handleChangeSexo(value)}
                 style={{
                  inputWeb: {
                    width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
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
                     
                 ]}
             />
          
          <TextInput style={styles.input}
          placeholder='IMC'
          onChangeText={text => handleChange('imc', text)}/>

          <TextInput style={styles.input}
          placeholder='HTA'
          onChangeText={text => handleChange('hta', text)}/>
          
          <TextInput style={styles.input}
          placeholder='DM'
          onChangeText={text => handleChange('dm', text)}/>

          <TextInput style={styles.input}
          placeholder='DLP'
          onChangeText={text => handleChange('dlp', text)}/>

          <TextInput style={styles.input}
          placeholder='APM'
          onChangeText={text => handleChange('apm', text)}/>
          

          <TextInput style={styles.input}
          placeholder='APQ'
          onChangeText={text => handleChange('apq', text)}/>

          <TextInput style={styles.input}
          placeholder='GOT'
          onChangeText={text => handleChange('got', text)}/>

      </View>
      
      <View style={{ width: '50%', marginTop: 50,}}>

          <TextInput style={styles.input}
          placeholder='GPT'
          onChangeText={text => handleChange('gpt', text)}/>

          <TextInput style={styles.input}
          placeholder='GGT'
          onChangeText={text => handleChange('ggt', text)}/>

          <TextInput style={styles.input}
          placeholder='NA'
          onChangeText={text => handleChange('na', text)}/>

          <TextInput style={styles.input}
          placeholder='BBT'
          onChangeText={text => handleChange('bbt', text)}/>

          <TextInput style={styles.input}
          placeholder='ACVHC'
          onChangeText={text => handleChange('acvhc', text)}/>

          <TextInput style={styles.input}
          placeholder='ACVHBC'
          onChangeText={text => handleChange('acvhbc', text)}/>

          <TextInput style={styles.input}
          placeholder='AMINAS'
          onChangeText={text => handleChange('aminas', text)}/>

          <TextInput style={styles.input}
          placeholder='DOSIS'
          onChangeText={text => handleChange('dosisna', text)}/>

<RNPickerSelect
          placeholder={placeholderEco}
                onValueChange={(valueEco) => handleChangeEcografia(valueEco)}
                 style={{
                  inputWeb: {
                    width:'95%',backgroundColor:'#FFFFFF',fontSize:15,marginBottom:7,borderWidth: 1, borderColor:'#9af88c',height:30,textAlign: 'center',padding: 4,borderRadius:5,flex: 1,
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

                     
                 ]}
             />
      </View>
           
      <View style={{width: '50%'}}>

      <TouchableOpacity style={styles.ButtonSave} onPress={handleSubmit}>
        <Text styles={{fontWeight: 'bold'}}>Añadir Injerto</Text>
      </TouchableOpacity>
      </View>
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