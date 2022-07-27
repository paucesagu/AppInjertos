import React , {useState, useEffect} from 'react'
import InjertosList from '../components/InjertosList'
import { Text, View} from 'react-native'
import Layout from "../components/Layout";
import {injertosNoEntrenados} from '../api'

const HomeScreen = () => {

    const [indice, setIndice] = useState([])  

  const loadIndice = async () =>{
    const data = await injertosNoEntrenados();
    setIndice(data);
    console.log(data);
}
useEffect(() => {    
    loadIndice() 
  }, [])

    return (
      <Layout>
        <View style={{display:'block'}}>
        <Text style={{fontSize:'15px'}}>Injertos valorados sin entrenar:</Text> <Text style={{fontWeight: 'bold', fontSize:'15px'}}> {indice}</Text>
      </View>
          <InjertosList/>
      </Layout>
    )
  }
             
export default HomeScreen