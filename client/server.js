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
const testUserData = 
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

//Send user data
app.get('/login', async(req, res)=>{
    try{
        //Send test data (this will soon be populated with database functionality).
        res.json(testUserData);
    }catch(err){
        console.log(err.message);
    }
});

//Receieve request from register.js
app.post('/newAccount', async(req) => {
    testUserData.push(req.body)
    console.log(testUserData);
});


//Start the server

app.listen(5000, ()=>{
    console.log("server has started on port 5000");
  });