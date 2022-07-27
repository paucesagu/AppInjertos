import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {reentrenar} from '../api'

const EntrenamientoItem = ({entrenamientos}) => {

    const navigation= useNavigation()

  return (
      <View style={styles.item}>
          <View style={styles.container}>
            <TouchableOpacity style={{paddingRight:30}}>
              <View style={{flexDirection: 'row',display: 'block'}}>
                <Text style={{fontWeight: 'bold'}}>Instancia: </Text>
                <Text style={{fontWeight: 'bold'}}> {entrenamientos.ultima_instancia}</Text>
              </View>
              <View style={{flexDirection: 'row',display: 'block'}}>
                <Text>Número de Injertos: </Text>
                <Text>{entrenamientos.numero_instancias} </Text>
              </View>
              <View style={{flexDirection: 'row',display: 'block'}}>
                <Text>Fecha: </Text>
                <Text>{entrenamientos.fecha} </Text>
              </View>
              <View style={{flexDirection: 'row',display: 'block'}}>
                <Text>AUC: </Text>
                <Text>{entrenamientos.auc}</Text>
              </View>
              
            
            </TouchableOpacity>
          
          </View>
        </View>
      )
}
const styles = StyleSheet.create({
    
    item:{
        backgroundColor:"#FFFFFF",
        padding:20,
        marginVertical:8,
        borderRadius:5,
        textAlign:"left",
        borderWidth: 3,
        borderColor:'#9af88c',
        borderRadius:10,   
    },
    container:{
      alignItems: 'left',
      justifyContent: 'left',
      textAlign:'left',
      width:"100%",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
    }
})

export default EntrenamientoItem