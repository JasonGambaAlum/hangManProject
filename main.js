
class dataController {
    constructor() {
    }

    addData(item) {
        this.data.push(item);
    } 

    getData() {
        return this.data;
    } 
    
    removeData(item) {
        this.data = this.data.filter(i => i !== item);
    } 
    
    clearData() {
        this.data = [];
    } 
    
}

class userController {
    constructor() {
        this.users = [];
    }   
}

function main() {
    
    
    const dataCtrl = new dataController();
    const userCtrl = new userController();


    dataCtrl.addData("Sample Item 1");
    dataCtrl.addData("Sample Item 2");
    dataCtrl.printData();
}

// Función para obtener el valor de una cookie por nombre
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) {
      return decodeURIComponent(value); // decodifica caracteres especiales
    }
  }
  return null;
}

// Función para comprobar si el usuario está logeado
function checkUserLoggedIn() {
  const userCookie = getCookie("user");
  
  if (!userCookie) {
    console.log("No existe la cookie de usuario.");
    return false;
  }

  try {
    // Suponemos que la cookie guarda un JSON con info del usuario
    const userData = JSON.parse(userCookie);

    if (userData.loggedIn === true) {
      console.log("Usuario logeado:", userData.username);
      return true;
    } else {
      console.log("Usuario no está logeado.");
      return false;
    }
  } catch (error) {
    console.error("Error al parsear la cookie:", error);
    return false;
  }
}




window.onload = () => {
    console.log("Page is fully loaded");

    try {
        main();
    } catch (error) {
        //console.error("An error occurred:", error);
        //alert("An unexpected error occurred. Please try again later."); 
    }

}