console.log("user_profile.js: Startup");

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


function confirmChanges(curr){

    const body = { 
        "username": curr,
        "fullname": userData[0].fullname,
        "address1": userData[0].address1,
        "address2": userData[0].address2,
        "city": userData[0].city,
        "state": userData[0].state,
        "zipcode": userData[0].zipcode 
    };
    return body;
}

function populateFields(user){
    var body = { 
        "fullname": '',
        "address1": '',
        "address2": '',
        "city": '',
        "state": '',
        "zipcode": 00000 
    };

    for(var i = 0; i < userData.length; i++){
        if(userData[i].username == user){
            body.fullname = userData[i].fullname;
            body.address1 = userData[i].address1;
            body.address2 = userData[i].address2;
            body.city = userData[i].city;
            body.state = userData[i].state;
            body.zipcode = userData[i].zipcode;
            return body;
        }
    }
    return false;
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
    populateFields,
    confirmChanges
}