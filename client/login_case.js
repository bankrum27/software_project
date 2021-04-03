console.log("login.js: Startup");

let userData = [
  {      
    "username": "RGreen",
    "password": "U2FsdGVkX1/WIeY0pM/v36A8Erhd6hIBoTvXu+M9TIQ=",
    "fullname": "Robert Green",
    "address1": "881 Roosevelt Court",
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

//Function to find out whether the username and password are in the database
function validateAccount(name, pass){
  var de;

  for(var i = 0; i < userData.length; i++){
    de = crypt.decrypt(userData[i].password);
    if(userData[i].username == name && de == pass){
      return true;
    }
  }

  return false;
}

//This function shows how we can fetch user data from the server (index.js), we will use this when working with the database.
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
    validateAccount,
    getData
}