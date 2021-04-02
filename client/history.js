console.log("history.js: startup");

const curr = window.localStorage.getItem("Current User");

let userData = [];
let fuelData = [];

const doc = document.getElementsByClassName("container")[0];

function drawInformation(){
    console.log(fuelData.length);
    
    var z = 0;
    for(var i = 0; i < fuelData.length; i++){
        if(fuelData[i].username == curr){
            var h5 = document.createElement("h5");
            h5.innerHTML = "Order " + (z+1);
            
            var p1 = document.createElement("p"); 
            p1.innerHTML = "Address: " + fuelData[i].address + "<br>";
            p1.innerHTML += "State: " + fuelData[i].state + "<br>";
            p1.innerHTML += "Date: " + fuelData[i].date + "<br>";
            p1.innerHTML += "Number Of Gallons: " + fuelData[i].gallons + "<br>";
            p1.innerHTML += "Price Per Gallon: " + fuelData[i].gprice + "<br>";
            p1.innerHTML += "Total Price: " + fuelData[i].tprice + "<br>";
    
            doc.appendChild(h5);
            doc.appendChild(p1);
            z++;
        }
    }

}

async function getData() {
    // use try... catch... to catch error
    try {
        const response = await fetch("http://localhost:5000/login");
        const testData = await response.json();
        userData = testData;
        const response2 = await fetch("http://localhost:5000/fuellogin");
        const testData2 = await response2.json();
        fuelData = testData2;
        drawInformation();
    } catch (err) {
      console.log(err.message);
    }
}


getData();