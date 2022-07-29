import React from "react";
import InjertosList from '../components/InjertosList'
import Layout from "../components/Layout";
import { injertosNoValorados } from "../api";

const HomeScreenUsuario = () => {
  const [indice2, setIndice2] = useState([])  

  const loadIndice2 = async () =>{
    const data = await injertosNoValorados();
    setIndice2(data);
    console.log(data);
  }
  
  useEffect(() => {    
      
      loadIndice2() 
    }, [])


  return (
    <Layout>
      <View style={{display:'block'}}>
        <Text style={{fontSize:'15px'}}>Injertos no valorados:</Text> <Text style={{fontWeight: 'bold', fontSize:'15px'}}> {indice2}</Text>
        
      </View>
        <InjertosList/>
    </Layout>
  )
}

export default HomeScreenUsuario