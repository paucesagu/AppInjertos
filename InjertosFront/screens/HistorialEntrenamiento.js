import React from 'react'
import EntrenamientoList from '../components/EntrenamientoList'
import LayoutEntrenamiento from "../components/LayoutEntrenamiento";
import { reentrenar } from '../api';
import Row from 'react-bootstrap/Row';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'


const HistorialEntrenamiento = () => {
    const handleSubmit = async () => {
        await reentrenar()
        
          navigation.navigate('HistorialEntrenamiento');
        
       
      }
return(
    <View style={{alignItems: 'center'}}>
    <Row style={{marginTop:15, padding:5}}>
      <Text style={{fontSize:"15", fontWeight:"bold"}} >Recuerde reinicar la aplicación en cada nuevo entrenamiento</Text>
      <TouchableOpacity style={styles.ButtonSave} onPress={handleSubmit}>
      <Text styles={{fontWeight: 'bold'}}>Reentrenar el modelo</Text>
    </TouchableOpacity>
    </Row>
        <LayoutEntrenamiento>
        <EntrenamientoList/>
        </LayoutEntrenamiento>
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