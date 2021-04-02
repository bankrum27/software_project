console.log("Quote.js started");
const numGallons = document.getElementById("gallons");
const address = document.getElementById("add1");
const state = document.getElementById("state");
const date = document.getElementById("date");
const suggested = document.getElementById("priceper");
const total = document.getElementById("total");
const curr = window.localStorage.getItem("Current User");

let margin;

let userData = [];
let fuelData = [];

function submitOrder(){
    calculateMargin();
    var temp =
        {
            "username": curr,
            "gallons": numGallons.value,
            "address": address.value,
            "state": state.value,
            "date": date.value,
            "gprice": suggested.value,
            "tprice": total.value
        }
    ;

    const response = fetch("http://localhost:5000/newOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp)
    }
    );

    return true;
}

function calculateMargin(){
    /* Factors affecting margin:
        Location Factor = 2% for Texas, 4% for out of state.
        Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
        Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
        Company Profit Factor = 10% always
        Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)
    */
   margin = 0;
   margintemp = 0;
    var id = -1;
    for(var i = 0; i < fuelData.length; i++){
        if(fuelData[i].username == curr){
            id = i;
        }
    }

    //Location Factor
    if(state.value == "TX"){
        margintemp += 0.02;
    }else{
        margintemp += 0.04;
    }

    //Rate History Factor
    if(fuelData.length > 0){
        margintemp -= 0.01;
    }

    //Gallons Requested Factor
    if(numGallons.value > 1000){
        margintemp += 0.02;
    }else{
        margintemp += 0.03;
    }

    //Company Profit Factor
    margintemp += 0.1;
    margin = 1.5 * margintemp;
    
    suggested.value = margin + 1.5;
    total.value = suggested.value*numGallons.value;

    suggested.value = parseFloat(suggested.value).toFixed(2);
    total.value = parseFloat(total.value).toFixed(2);
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
        calculateMargin();
    } catch (err) {
      console.log(err.message);
    }
}


getData();