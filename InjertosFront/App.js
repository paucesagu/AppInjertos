import React , {useState} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, Feather,FontAwesome5   } from '@expo/vector-icons';
import AddInjertos from './screens/AddInjertos';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ListadoUsers from './screens/ListadoUsers';
import UpdateInjertos from './screens/UpdateInjertos';
import ViewInjertos from './screens/ViewInjertos';
import NewUser from './screens/NewUser';
import ViewUser from './screens/ViewUser';
import MiPerfil from './screens/MiPerfil';
import UpdateUsers from './screens/UpdateUsers';
import UpdateContraseña from './screens/UpdateContraseña';
import { logout } from "./api";
import HistorialEntrenamiento from './screens/HistorialEntrenamiento';
import swal from 'sweetalert';


const Stack = createStackNavigator();



const App = ()=> {
  var userDNI = localStorage.getItem('userDNI');
  console.log(userDNI);

  const [disabled,setDisabled]=useState(false)

  const onLogOut = async () =>{
    try {
      
      var resultado = await logout();
      if(resultado.includes("Exito")){
        localStorage.removeItem("token");
        navigation.navigate("LoginScreen");
      }
      else{
        swal("Ha habido un error", resultado, error);
      }
      
      
    } catch (error) {
      console.log(error);
    }
    
    }

  return(
    <NavigationContainer>
      <Stack.Navigator> 
        
        <Stack.Screen name="LoginScreen" 
          title="Login"
          component = {LoginScreen} 
          options={{
            title: 'Login',
          headerStyle:{backgroundColor: "#9af88c"},
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },headerTitleAlign: 'center',}}/> 

        <Stack.Screen name="MiPerfil" 
          title="Mi Perfil"
          component={MiPerfil}
          options={{
            title:"Mi Perfil",
            headerStyle:{backgroundColor: "#9af88c"},
            headerTitleStyle:{
              fontWeight:'bold'},
            headerTitleAlign:'center',
            headerTintColor: "black",
        }}/> 
        
        <Stack.Screen 
          name="HomeScreen"
          component = {HomeScreen} 
          options={ ({navigation}) => ({
            title:"Inicio",
            headerStyle: {backgroundColor: "#9af88c"},
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <TouchableOpacity style={{display:'block', marginLeft:3}}>
                <AntDesign style={{marginLeft:10}} name="addfile" size={30} color="black" onPress={() => navigation.navigate("AddInjertos")} />
                
                <Feather style= {{marginLeft:30}} name="users" size={30} color="black" onPress={() => navigation.navigate("ListadoUsers")} />   

                <FontAwesome5 style= {{marginLeft:30}} name="history" size={28} color="black" onPress={() => navigation.navigate("HistorialEntrenamiento")} />
              </TouchableOpacity>
            
          ),
            headerRight: () => (
              <TouchableOpacity style={{display:'block', marginLeft:3}}>
            
                <AntDesign name="user" style={{marginRight:15}} size={34} color="black" onPress={() => navigation.navigate("MiPerfil",{dni: userDNI})} />
            
                <AntDesign name="logout" size={28} color="black" onPress={onLogOut}/><Text style={{marginLeft:3,fontSize:'large', fontWeight:'bold'}}>Salir</Text>
            
            </TouchableOpacity>
          )
      })}/>
        

         <Stack.Screen 
            name="HomeScreenUsuario"
            component = {HomeScreen} 
            options={ ({navigation}) => ({
              title:"Inicio",
              headerStyle: {backgroundColor: "#9af88c"},
              headerTitleAlign: 'center',
              headerTitleStyle:{
                fontWeight: 'bold',
              },
              headerLeft: () => (
              <TouchableOpacity style={{display:'block', marginLeft:3}}>
                <AntDesign style={{marginLeft:10}} name="addfile" size={30} color="black" onPress={() => navigation.navigate("AddInjertos")} />
              </TouchableOpacity>
              
            ),
            headerRight: () => (
              <TouchableOpacity style={{display:'block', marginLeft:3}}>
                
                <AntDesign name="user" style={{marginRight:15}} size={34} color="black" onPress={() => navigation.navigate("MiPerfil",{dni: userDNI})} />
          
              <AntDesign name="logout" size={28} color="black" onPress={onLogOut}/><Text style={{marginLeft:3,fontSize:'large', fontWeight:'bold'}}>Salir</Text>
          
            </TouchableOpacity>
            )
          })}/>

        <Stack.Screen name="HistorialEntrenamiento" 
          title="Modificar Injertos"
          component={HistorialEntrenamiento}
          options={{
            title:'Historial Entrenamientos',
            headerStyle:{backgroundColor: "#9af88c"},
            headerTitleStyle:{
              fontWeight:'bold'},
            headerTitleAlign:'center',
            headerTintColor: "black",
        }}/> 
         

        <Stack.Screen name="UpdateInjertos" 
          title="Modificar Injertos"
          component={UpdateInjertos}
          options={{
            title:'Modificar Injertos',
            headerStyle:{backgroundColor: "#9af88c"},
            headerTitleStyle:{
              fontWeight:'bold'},
            headerTitleAlign:'center',
            headerTintColor: "black",
        }}/> 

         <Stack.Screen name="ViewInjertos" 
          title="Ver Injertos"
          component={ViewInjertos}
          options={{
            title:'Ver Injertos',
            headerStyle:{backgroundColor: "#9af88c"},
            headerTitleStyle:{
              fontWeight:'bold'},
            headerTitleAlign:'center',
            headerTintColor: "black",
        }}/> 
        
        <Stack.Screen name="AddInjertos" 
          title="Añadir Injerto"
          component={AddInjertos}
          options={{
            title:'Añadir Injerto',
            headerStyle:{backgroundColor: "#9af88c"},
            headerTitleStyle:{
              fontWeight:'bold'},
            headerTitleAlign:'center',
            headerTintColor: "black",
        }}/> 

        <Stack.Screen name="NewUser" 
          title="Añadir Usuario"
          component={NewUser}
          options={{
            title:'Añadir Usuario',
            headerStyle:{backgroundColor: "#9af88c"},
            headerTitleStyle:{
              fontWeight:'bold'},
            headerTitleAlign:'center',
            headerTintColor: "black",
        }}/> 

        <Stack.Screen name="ListadoUsers" 
          
          component={ListadoUsers}
          options={ ({navigation}) => ({
            title:"Listado de Usuarios",
            headerStyle: {backgroundColor: "#9af88c"},
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontWeight: 'bold',
            },
          headerRight: () => (
            <TouchableOpacity style={{display:'block', marginRight:'10px'}} onPress={() => navigation.navigate("NewUser")}>
              <AntDesign name="adduser" size={36} color="black" />
            </TouchableOpacity>
          )
      })}/> 

      <Stack.Screen name="ViewUser" 
        title="Ver Usuario"
        component={ViewUser}
        options={{
          title:'Ver Usuario',
          headerStyle:{backgroundColor: "#9af88c"},
          headerTitleStyle:{
            fontWeight:'bold'},
          headerTitleAlign:'center',
          headerTintColor: "black",
        }}/> 

      <Stack.Screen name="UpdateUsers" 
        title="Modificar Usuario"
        component={UpdateUsers}
        options={{
          title:'Modificar Usuario',
          headerStyle:{backgroundColor: "#9af88c"},
          headerTitleStyle:{
            fontWeight:'bold'},
          headerTitleAlign:'center',
          headerTintColor: "black",
        }}/>

<Stack.Screen name="ModificarContraseña" 
        title="Modificar Contraseña"
        component={UpdateContraseña}
        options={{
          title:'Modificar Contraseña',
          headerStyle:{backgroundColor: "#9af88c"},
          headerTitleStyle:{
            fontWeight:'bold'},
          headerTitleAlign:'center',
          headerTintColor: "black",
        }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
