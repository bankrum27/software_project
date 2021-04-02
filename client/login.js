console.log("login.js: Startup");

let userData = [];

window.localStorage.clear();

//Encrypt Function
var crypt = {
  secret: "cosc4353",
  encrypt: function(clear){
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },

  decrypt: function(cipher){
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }
};

//Function to find out whether the username and password are in the database
function validateAccount(){

  const name = document.getElementById("usrname").value;
  const pass = document.getElementById("psw").value;
  var de;

  for(var i = 0; i < userData.length; i++){
    de = crypt.decrypt(userData[i].password);
    if(userData[i].username == name && de == pass){
      window.localStorage.setItem('Current User', name);
      return true;
    }
  }

  document.getElementById("error").innerHTML = "Username and/or Password are incorrect, please try again or register a new account.";

  return false;
}

//This function shows how we can fetch user data from the server (index.js), we will use this when working with the database.
async function getData() {
    // use try... catch... to catch error
    try {
        const response = await fetch("http://localhost:5000/login");
        const testData = await response.json();
        userData = testData;
        console.log(userData);
    } catch (err) {
      console.log(err.message);
    }
}

getData();