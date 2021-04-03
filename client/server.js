const express = require('express');
const app = express();
const cors = require('cors');

var pg = require('pg'); //PostgreSQL library
var fs = require('fs');
const { getDefaultSettings } = require('http2');
const { text } = require('express');

var conString = "postgres://nrlyxpww:v3pd-5PW3jrOJp7wd3iVWt2rjBSac4rX@kashin.db.elephantsql.com:5432/nrlyxpww"; //elephantsql.com database
var client = new pg.Client(conString);
client.connect();


// middleware
app.use(cors());
app.use(express.json());      //req.body

//Send user data
app.get('/login', async(req, res)=>{
    try{
        //Send test data
        client.query('SELECT * FROM users;', function(err, result){
            if(err){
                return console.error("Error running query", err);
            }
            var t = JSON.parse(JSON.stringify(result.rows));
            res.json(t);
        });
    }catch(err){
        console.log(err.message);
    }
});

//Send order history data
app.get('/fuellogin', async(req, res)=>{
    try{
        //Send test data
        client.query('SELECT * FROM history;', function(err, result){
            if(err){
                return console.error("Error running query", err);
            }
            var t = JSON.parse(JSON.stringify(result.rows));
            res.json(t);
        });
    }catch(err){
        console.log(err.message);
    }
});

//Receieve request from register.js
app.post('/newAccount', async(req) => {
    var q = "INSERT INTO users(username, password) VALUES ('" + req.body.name + "', '" + req.body.password + "');";
    
    client.query(q, function(err, result){
        if(err){
            console.error("Error sending query", err);
        }
    });
});

//Receive request from user_profile.js
app.post('/confirmChanges', async(req) => {
    var q = "UPDATE users SET fullname = '" + req.body.fullname + "', address1 = '" + 
    req.body.address1 + "', address2 = '" + req.body.address2 + "', city = '"
    + req.body.city + "', state = '" + req.body.state + "', zipcode = " + req.body.zipcode + " WHERE username = '" + req.body.username + "';";
    
    client.query(q, function(err, result){
        if(err){
            console.error("Error sending query", err);
        }
    });
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

    var q = "INSERT INTO HISTORY(username, gallons, address, state, date, gprice, tprice) VALUES ('"
    + req.body.username + "', " + req.body.gallons + ", '" + req.body.address + "', '"
    + req.body.state + "', '" + req.body.date + "', " + req.body.gprice + ", " + req.body.tprice + ");";
    
    client.query(q, function(err, result){
        if(err){
            console.error("Error sending query", err);
        }
    });
});


//Start the server

app.listen(5000, ()=>{
    console.log("server has started on port 5000");
  });