//We have to store JSON data as a string (localStorage does not support JSON)
localStorage.setItem("user", JSON.stringify(testData));
console.log(localStorage)

//Get back the original JSON data from the localStorage's string
const JSONData = JSON.parse(localStorage.getItem("user"));
console.log(JSONData);


/*  How to send data

const username = document.querySelector('#usrname');
username.value = testData;
*/


//How to Change Fields
const username = document.querySelector('#usrname');
username.value = testData.name;

const password = document.querySelector('#psw');
password.value = testData.password;