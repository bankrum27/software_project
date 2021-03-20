// Testing validateAccount()

// values for testing in function call
let userData = [{      
  "username": "RGreen",
  "password": "RGfuel10!",
  "fullname": "Robert Green",
  "address1": "46 Overlook St",
  "address2": "",
  "city": "Hamilton",
  "state": "OH",
  "zipcode": "45011"
},
{
  "username": "JSmith",
  "password": "Fuelprice10",
  "fullname": "Jessica Smith",
  "address1": "328 Linden Lane",
  "address2": "",
  "city": "Houston",
  "state": "TX",
  "zipcode": "77033"
}];

var testFuelData = 
    [
    {      
        "username": "RGreen",
        "order": 
        [
            {
                "gallons": "510",
                "address": "881 Roosevelt Court Houston, TX 77066",
                "state": "TX",
                "date": "2021-4-15",
                "gprice": "51",
                "tprice": "2001"
            }
        ]
    },
    {
        "username": "JSmith",
        "order":
        [

        ]
    }
    ]
;


//LOGIN.JS UNIT TESTING
function validateAccount(name, pass){
    // Contents of actual function

    /*const name = document.getElementById("usrname").value;
    const pass = document.getElementById("psw").value; */ 

    for(var i = 0; i < userData.length; i++){
      if(userData[i].username == name && userData[i].password == pass){
        //window.localStorage.setItem('Current User', name);
        return true;
      }
    }
  
    //document.getElementById("error").innerHTML = "Username and/or Password are incorrect, please try again or register a new account.";
  
    return false;
  }

//REGISTER.JS UNIT TESTING
function validateRegistration(name, pw){   
  let val = true;
  console.log("Validating");

  const user = name;
  const pass = pw;

  for(var i = 0; i < userData.length; i++){
      if(userData[i].username == user){
          val = false;
      }
  }

  if(!val){
      return false;
  }

  return true;
}

//USER_PROFILE.JS UNIT TESTING
function confirmChanges(a1, a2, a3, a4, a5, a6, a7){

  const body = { 
      "username": a1,
      "fullname": a2,
      "address1": a3,
      "address2": a4,
      "city": a5,
      "state": a6,
      "zipcode": a7 
  };

  const jsonTest = { 
    "username": 'JSmith',
    "fullname": 'Joseph Smith',
    "address1": '46 Overlook St',
    "address2": '',
    "city": 'Houston',
    "state": 'TX',
    "zipcode": '77044' 
  };

  if(body.state == jsonTest.state){
    return true;
  }
  return false;
}

function populateFields(name, add1, add2, city, state, zip){
  var nameField = name;
  var add1Field = add1;
  var add2Field = add2;
  var cityField = city;
  var stateField = state;
  var zipField = zip;
  
  if(nameField == name){
    return true;
  }
  
  return false;
}

function calculateMargin(numG, st, his){
  /* Factors affecting margin:
      Location Factor = 2% for Texas, 4% for out of state.
      Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
      Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
      Company Profit Factor = 10% always
      Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)
  */
var numGallons = numG;
var state = st;
var history = his;



 curr = "JSmith";
 margin = 0;
 margintemp = 0;

  //Location Factor
  if(state == "TX"){
      margintemp += 0.02;
  }else{
      margintemp += 0.04;
  }

  //Rate History Factor
  if(history == true){
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
  return total;
}