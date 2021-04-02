console.log("register.js: Startup");

userData = [];

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

async function sendData(name, pass){
    console.log("Sending data");
    window.localStorage.setItem('Current User', name);
    var en = crypt.encrypt(pass);   //Encrypt the password
    const body = { 
        "name": name,
        "password": en,
        "city": "",
        "state": "" };
    const response = fetch("http://localhost:5000/newAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
    );
}

//Function to check that the username hasn't already been taken.
function validateRegistration(){   
    let val = true;
    console.log("Validating");

    const user = document.getElementById("usrname").value;
    const pass = document.getElementById("psw").value;

    for(var i = 0; i < userData.length; i++){
        if(userData[i].username == user){
            val = false;
        }
    }

    if(!val){
        document.getElementById("error").innerHTML = "Username already in use. Please choose another username.";
        return false;
    }
    sendData(user, pass);

    return true;
}

async function getData() {
    // use try... catch... to catch error
    try {
        const response = await fetch("http://localhost:5000/login");
        const testData = await response.json();
        userData = testData;

    } catch (err) {
      console.log(err.message);
    }
}

getData();