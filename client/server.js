const express = require('express');
const app = express();
const cors = require('cors');

var fs = require('fs');
const { getDefaultSettings } = require('http2');
const { text } = require('express');

// middleware
app.use(cors());
app.use(express.json());      //req.body

//SAMPLE DATA FOR TESTING (Don't have Database yet)
var testUserData = 
    [
    {      
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
    }
    ]
;

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


//Send user data
app.get('/login', async(req, res)=>{
    try{
        //Send test data (this will soon be populated with database functionality).
        res.json(testUserData);
    }catch(err){
        console.log(err.message);
    }
});

//Send fuel data
app.get('/fuellogin', async(req, res)=>{
    try{
        //Send test data (this will soon be populated with database functionality).
        res.json(testFuelData);
    }catch(err){
        console.log(err.message);
    }
});

//Receieve request from register.js
app.post('/newAccount', async(req) => {
    testUserData.push(req.body)
    console.log(testUserData);
});

//Receive request from user_profile.js
app.post('/confirmChanges', async(req) => {
    for(var i = 0 ; i < testUserData.length; i++){
        if(testUserData[i].username == req.body.username){
            testUserData[i].fullname = req.body.fullname;
            testUserData[i].address1 = req.body.address1;
            testUserData[i].address2 = req.body.address2;
            testUserData[i].city = req.body.city;
            testUserData[i].state = req.body.state;
            testUserData[i].zipcode = req.body.zipcode;
        }
    }
});

app.post('/newOrder', async(req) => {
    console.log("new order");
    const ord = {
        "gallons": req.body.gallons,
        "address": req.body.address,
        "state": req.body.state,
        "date": req.body.date,
        "gprice": req.body.gprice,
        "tprice": req.body.tprice
    };

    testFuelData[req.body.id].order.push(ord);
});


//Start the server

app.listen(5000, ()=>{
    console.log("server has started on port 5000");
  });