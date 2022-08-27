import React , {useState, useEffect} from 'react'
import InjertosList from '../components/InjertosList'
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import Layout from "../components/Layout";
import {injertosNoEntrenados, injertosNoValorados} from '../api'
import { EvilIcons } from '@expo/vector-icons';

const HomeScreen = () => {

    return (
      <Layout>
       
          <InjertosList/>
      </Layout>
    )
  }
           
  
  const styles = StyleSheet.create({
    
    ButtonSave: {
      paddingTop:10,
      paddingBottom:10,
      borderRadius:10,
      marginBottom:3,
      backgroundColor:'#9af88c',
      width:'100%',
      textAlign:'center',
      width: '100%', height: '100%'
    
    }
    
    
  })
export default HomeScreen