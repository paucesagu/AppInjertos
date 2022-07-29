import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Row from 'react-bootstrap/Row';
import {useNavigation} from '@react-navigation/native'
import { Feather, FontAwesome5  } from '@expo/vector-icons';

const UsersItem = ({usuarios}) => {

    const navigation= useNavigation()
    console.log(usuarios.dni)

    return (
        <View style={styles.item}>
          <View style={styles.container}>
            <TouchableOpacity style={{paddingRight:30}} onPress={() => navigation.navigate('ViewUser', {dni: usuarios.dni})} >
              <View style={{flexDirection: 'row',display: 'block'}}>
                <Text style={{fontWeight: 'bold'}}>DNI: </Text>
                <Text style={{fontWeight: 'bold'}}> {usuarios.dni}</Text>
              </View>
              <View style={{flexDirection: 'row',display: 'block'}}>
                <Text>Nombre: </Text>
                <Text>{usuarios.nombre} </Text>
              </View>
              <View style={{flexDirection: 'row',display: 'block'}}>
                <Text>Apellidos: </Text>
                <Text>{usuarios.apellidos} </Text>
              </View>
              <View style={{flexDirection: 'row',display: 'block'}}>
                <Text>Rol: </Text>
                <Text>{usuarios.rol}</Text>
              </View>
            
            </TouchableOpacity>
            <Row style={{display:"flex"}}>
         <TouchableOpacity style={{paddingRight:10}} onPress={() => navigation.navigate('ViewUser', {dni: usuarios.dni})}>
            <FontAwesome5 name="eye" size={30} color="black" />
         </TouchableOpacity>
         <TouchableOpacity style={{paddingRight:10}} onPress={() => navigation.navigate('UpdateUsers', {dni: usuarios.dni})}>
            <Feather name="edit" size={30} color="black" />
         </TouchableOpacity>
         </Row>
        
          </View>
        </View>
      )
    }
    const styles = StyleSheet.create({
    
        item:{
          backgroundColor:"#FFFFFF",
          width:"50%",
          padding:10,
          marginVertical:8,
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

export default UsersItem