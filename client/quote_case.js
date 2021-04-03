console.log("Quote.js started");
/*
const numGallons = document.getElementById("gallons");
const address = document.getElementById("add1");
const state = document.getElementById("state");
const date = document.getElementById("date");
const suggested = document.getElementById("priceper");
const total = document.getElementById("total");
const curr = window.localStorage.getItem("Current User");
*/

let margin;

let userData = [
    {
        username: 'RGreen',
        password: 'U2FsdGVkX1/WIeY0pM/v36A8Erhd6hIBoTvXu+M9TIQ=',
        fullname: 'Robert Green',
        address1: '881 Roosevelt Court',
        address2: '',
        city:     'Houston',
        state:    'TX',
        zipcode:  77066
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

function submitOrder(user, state, numGallons, address, date, suggested, total){
    var temp =
        {
            "username": user,
            "gallons": numGallons,
            "address": address,
            "state": state,
            "date": date,
            "gprice": suggested,
            "tprice": total
        }
    ;

    return temp;
}

function calculateMargin(user, state, numGallons){
    /* Factors affecting margin:
        Location Factor = 2% for Texas, 4% for out of state.
        Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
        Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
        Company Profit Factor = 10% always
        Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)
    */
   var suggested = 0;
   margin = 0, total = 0;
   margintemp = 0;
    var id = -1;
    var found = false;
    for(var i = 0; i < fuelData.length; i++){
        if(fuelData[i].username == user){
            id = i;
            found = true;
        }
    }

    //Location Factor
    if(state == "TX"){
        margintemp += 0.02;
    }else{
        margintemp += 0.04;
    }

    //Rate History Factor
    if(found){
        margintemp -= 0.01;
    }

    //Gallons Requested Factor
    if(numGallons > 1000){
        margintemp += 0.02;
    }else{
        margintemp += 0.03;
    }

    //Company Profit Factor
    margintemp += 0.1;
    margin = 1.5 * margintemp;
    
    suggested = margin + 1.5;
    total = suggested*numGallons;

    suggested = parseFloat(suggested).toFixed(2);
    total = parseFloat(total).toFixed(2);

    var obj = [suggested, total];
    return obj;
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
    calculateMargin,
    submitOrder
}