console.log("register.js: Startup");

let userData = [
    {      
      "username": "RGreen",
      "password": "U2FsdGVkX1/WIeY0pM/v36A8Erhd6hIBoTvXu+M9TIQ=",
      "fullname": "Robert Green",
      "address1": "46 Overlook St",
      "address2": "",
      "city": "Hamilton",
      "state": "OH",
      "zipcode": "45011"
    }
  ];

var cjs = require('crypto-js');

//Encrypt Function
var crypt = {
    secret: "cosc4353",
    encrypt: function(clear){
      var cipher = cjs.AES.encrypt(clear, crypt.secret);
      cipher = cipher.toString();
      return cipher;
    },
  
    decrypt: function(cipher){
      var decipher = cjs.AES.decrypt(cipher, crypt.secret);
      decipher = decipher.toString(cjs.enc.Utf8);
      return decipher;
    }
};

function sendData(name, pass){
    var en = crypt.encrypt(pass);   //Encrypt the password
    const body = { 
        "name": name,
        "password": en,
        "city": "",
        "state": "" 
    };
    return body;
}

//Function to check that the username hasn't already been taken.
function validateRegistration(user, pass){   
    let val = true;

    for(var i = 0; i < userData.length; i++){
        if(userData[i].username == user){
            val = false;
        }
    }

    if(!val){
        return false;
    }
    //sendData(user, pass);

    return true;
}

function getData(res) {
    // use try... catch... to catch error
    try {
        const testData = res;
        userData = testData;
        return userData;
    } catch (err) {
      console.log(err.message);
    }
}

module.exports = {
    crypt,
    validateRegistration,
    getData,
    sendData
}