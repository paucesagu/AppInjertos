//injertos
const API = "http://localhost:8000/injertos";
export const getInjertos = async () =>{
    const res = await fetch(API, {method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
    return await res.json();
    
}
export const getInjerto = async (injertoId) =>{
    const res = await fetch(`${API}/${injertoId}`, {method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
    return await res.json();
    
}
export const crearInjerto = async (newInjerto) =>{
  var res ="";
     await fetch(API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(newInjerto),
    }).then(response => response.json()).then((data)=>{
      res = data.message
  })
  console.log(res)
  return await res;
  };

export const editarInjerto = async (injertoId, newInjerto) => {
  var res = "";
    console.log(injertoId, newInjerto)
    await fetch(`${API}/${injertoId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(newInjerto),
    }).then(response => response.json()).then((data)=>{
      res = data.message
  })
  console.log(res)
  return await res;
  };

  export const predecir = async (injertoId) =>{
    const res = await fetch(`${API}/${injertoId}/predecir`, {
      method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
    return await res.json();
    
}


//autenticacion
export async function getRol(){
  const res = await fetch("http://localhost:8000/getRol", {method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
  return await res.json();
  
}

export const login = async (user) => {
  var res = "";
  console.log(user);
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  await fetch('http://localhost:8000/login', {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then(response => response.json())
    .then((data) =>{
      console.log(data)
      if(data.token === undefined) {
        res = data.message;
      }
      else{
        localStorage.setItem("token", data.token)
        res = "exito";
      }
    } )
    var rol = ""
    await getRol().then(response=>rol = response.rol);
    localStorage.setItem("rol", rol);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("rol"));
    return res;
  };

export const logout = async () =>{
  var res = "";
  await fetch('http://localhost:8000/logout', {
      method: "POST", headers:{"authorization": localStorage.getItem("token")}
    }).then(response => response.json()).then((data)=>{
        res = data.message
    })
    console.log(res)
    return await res;
    
}



//usuarios
const API2 = "http://localhost:8000/usuarios";

export const getUsuarios = async () =>{
    const res = await fetch(API2, {method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
    return await res.json();
    
}
export const getUser = async (usuarioId) =>{
    const res = await fetch(`${API2}/${usuarioId}`, {method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
    return await res.json();
    
}

export const crearUsuario = async (newUser) =>{
  var res = "";
  await fetch(API2, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(newUser),
  }).then(response => response.json()).then((data)=>{
    res = data.message
})
console.log(res)
return await res;
  
}

export const editarUsuario = async (usuarioId, newUser) => {
    var res = "";
    await fetch(`${API2}/${usuarioId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(newUser),
    }).then(response => response.json()).then((data)=>{
      res = data.message
  })
  console.log(res)
  return await res;
  };

  export const deleteUsuario = async (usuarioId) => {
    var res = "";
    await fetch(`${API2}/${usuarioId}`, {
      method: "DELETE", headers:{
        "authorization": localStorage.getItem("token")
      }
    }).then(response => response.json()).then((data)=>{
      res = data.message
  })
  console.log(res)
  return await res;
  };

  export const modificarContraseña = async (usuarioId, newPassword) => {
    console.log(usuarioId, newPassword)
    var res = "";
    await fetch(`${API2}/${usuarioId}/password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(newPassword),
    }).then(response => response.json()).then((data)=>{
      res = data.message
  })
  console.log(res)
  return await res;
  };

  //reentrenar

export const reentrenar = async () =>{
    const res = await fetch("http://localhost:8000/reentrenar", {
      method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
    return await res.json();
    
}

export const injertosNoEntrenados = async () =>{
  const res = await fetch("http://localhost:8000/injertosNoEntrenados", {
    method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
  return await res.json();
  
}
export const getReentrenamientos = async () =>{
  const res = await fetch("http://localhost:8000/reentrenamientos", {method: 'GET', headers: {"authorization": localStorage.getItem("token")}});
  return await res.json();
  
}