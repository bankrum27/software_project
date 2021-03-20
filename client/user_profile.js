console.log("user_profile.js: Startup");

let userData = [];


const fullname = document.getElementById("flname");
const add1 = document.getElementById("add1");
const add2 = document.getElementById("add2");
const city = document.getElementById("city");
const state = document.getElementById("state");
const zip = document.getElementById("zip");
const curr = window.localStorage.getItem("Current User");

function confirmChanges(){
    alert("Changes confirmed");

    const body = { 
        "username": curr,
        "fullname": fullname.value,
        "address1": add1.value,
        "address2": add2.value,
        "city": city.value,
        "state": state.value,
        "zipcode": zip.value 
    };
    const response = fetch("http://localhost:5000/confirmChanges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
    );

    return true;
}

function populateFields(){
    for(var i = 0; i < userData.length; i++){
        if(userData[i].username == curr){
            fullname.value = userData[i].fullname;
            add1.value = userData[i].address1;
            add2.value = userData[i].address2;
            city.value = userData[i].city;
            state.value = userData[i].state;
            zip.value = userData[i].zipcode;
            return true;
        }
    }
}

async function getData() {
    // use try... catch... to catch error
    try {
        const response = await fetch("http://localhost:5000/login");
        const testData = await response.json();
        userData = testData;
        populateFields();
    } catch (err) {
      console.log(err.message);
    }
}

getData();