import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'
import { Feather, FontAwesome5  } from '@expo/vector-icons';

const InjertosItem = ({injertos}) => {

  const navigation= useNavigation()


  const getBackgroundColor = () => {
    let color;
    if(injertos.validez == "Válido"){
      color ="#90EE90"
    }else{
      color="#ff0000"
    }
    return color
  }

  return (
    <View style={styles.item}>
     
      <View style={styles.container}>
        <TouchableOpacity style={{paddingRight:30}} onPress={() => navigation.navigate('ViewInjertos', {id: injertos.id})} >
          <View style={{flexDirection: 'row',display: 'block'}}>
            
            <Text style={{fontWeight: 'bold'}}>ID: </Text>
            <Text style={{fontWeight: 'bold'}}> {injertos.id}</Text>
          </View>
          <View style={{flexDirection: 'row',display: 'block'}}>
            <Text>Edad: </Text>
            <Text>{injertos.edad} </Text>
          </View>
          <View style={{flexDirection: 'row',display: 'block'}}>
            <Text>Sexo: </Text>
            <Text>{injertos.sexo} </Text>
          </View>
          <View style={{flexDirection: 'row',display: 'block'}}>
            <Text>Acierto: </Text>
            <Text>{injertos.acierto}</Text>
          </View>
          <View style={{flexDirection: 'row',display: 'block'}}>
            <Text>Probabilidad: </Text>
            <Text>{injertos.probabilidad}</Text>
          </View>
          <View style={{flexDirection: 'row',display: 'block'}}>
            <Text>Validez: </Text>
            <Text id="injerto" style={{fontSize:15,color: getBackgroundColor()}}>{injertos.validez}</Text>
          </View>
        </TouchableOpacity>
      
     <TouchableOpacity style={{paddingRight:20}} onPress={() => navigation.navigate('ViewInjertos', {id: injertos.id})}>
     <FontAwesome5 name="eye" size={30} color="black" />
     </TouchableOpacity>
     <TouchableOpacity onPress={() => navigation.navigate('UpdateInjertos', {id: injertos.id})}>
        <Feather name="edit" size={30} color="black" />
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

export default InjertosItem


