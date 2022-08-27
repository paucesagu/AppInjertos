import React from 'react'
import EntrenamientoList from '../components/EntrenamientoList'
import Layout from "../components/Layout";
import { reentrenar } from '../api';
import Row from 'react-bootstrap/Row';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import swal from 'sweetalert'


const HistorialEntrenamiento = () => {
    const handleSubmit = async () => {
      
        const resultado = await reentrenar()
        var mensaje = resultado.message;
     
        if(mensaje.includes('Exito')){
          swal("Enhorabuena", mensaje, "success");
        }
        else{
          swal("Ha habido un error", mensaje, "error");
        }
       
      }
return(
    <View style={{alignItems: 'center', backgroundColor: 'white',width: '100%', height: '100%'}}>
    <Row style={{marginTop:15, padding:5}}>
      <Text style={{fontSize:"15", fontWeight:"bold"}} >Recuerde reinicar la aplicación en cada nuevo entrenamiento</Text>
      <TouchableOpacity style={styles.ButtonSave} onPress={handleSubmit}>
      <Text styles={{fontWeight: 'bold'}}>Reentrenar el modelo</Text>
    </TouchableOpacity>
    <Text style={{fontSize:"15"}} >Esta operación tardará unos cuantos segundos</Text>
    </Row>
        <Layout>
        <EntrenamientoList/>
        </Layout>
    </View>    
)}  
const styles = StyleSheet.create({
    ButtonSave: {
      paddingTop:10,
      paddingBottom:10,
      borderRadius:10,
      marginBottom:3,
      backgroundColor:'#9af88c',
      width:'100%',
      textAlign:'center',
    }
    
  })
  
export default HistorialEntrenamiento