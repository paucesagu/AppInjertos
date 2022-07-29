import React , {useState, useEffect} from 'react'
import InjertosList from '../components/InjertosList'
import { Text, View, Row} from 'react-native'
import Layout from "../components/Layout";
import {injertosNoEntrenados, injertosNoValorados} from '../api'

const HomeScreen = () => {

    const [indice, setIndice] = useState([])  

  const loadIndice = async () =>{
    const data = await injertosNoEntrenados();
    setIndice(data);
    console.log(data);
}

const [indice2, setIndice2] = useState([])  

const loadIndice2 = async () =>{
  const data = await injertosNoValorados();
  setIndice2(data);
  console.log(data);
}

useEffect(() => {    
    loadIndice(),
    loadIndice2() 
  }, [])



 

    return (
      <Layout>
        <View style={{display:'block'}}>
          
          <Text style={{fontSize:'15px'}}>Injertos no valorados: </Text> <Text style={{fontWeight: 'bold', fontSize:'15px'}}> {indice2}          </Text>
          
        <Text style={{fontSize:'15px'}}>Injertos valorados sin entrenar: </Text> <Text style={{fontWeight: 'bold', fontSize:'15px'}}> {indice}</Text>
          
        
      </View>
          <InjertosList/>
      </Layout>
    )
  }
             
export default HomeScreen