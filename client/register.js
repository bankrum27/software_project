console.log("register.js: Startup");

userData = [];

async function sendData(name, pass){
    console.log("Sending data");

    const body = { 
        "name": name,
        "password": pass,
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