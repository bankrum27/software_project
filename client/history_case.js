console.log("history.js: startup");

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

let fuelData = [
    {
        username: 'RGreen',
        gallons:  '513',
        address:  '881 Roosevelt Court 77066',
        state:    'TX',
        date:     '2021-04-28',
        sprice:   '$1.73',
        tprice:   '$884.93'
    }
];

function drawInformation(curr){
    var h = [];
    
    var z = 0;
    for(var i = 0; i < fuelData.length; i++){
        if(fuelData[i].username == curr){
            var h1 = "";
            h1 = "Order " + (z+1);
            
            h1 += "\nAddress: " + fuelData[i].address + "\n";
            h1 += "State: " + fuelData[i].state + "\n";
            h1 += "Date: " + fuelData[i].date + "\n";
            h1 += "Number Of Gallons: " + fuelData[i].gallons + "\n";
            h1 += "Price Per Gallon: " + fuelData[i].sprice + "\n";
            h1 += "Total Price: " + fuelData[i].tprice + "\n";
            h.push(h1);
            z++;
        }
    }

    return h;
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
    getData,
    drawInformation
}