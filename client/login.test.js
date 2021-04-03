log = console.log
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash')

var testJSON = [
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

//login_case.js Test Cases
const login_case = {
    crypt,
    validateAccount,
    getData
} = require('./login_case');

describe('#login.js: Encryption/Decryption', () => {
    it('Decrypting from AES key', () => {
        login_case.crypt.decrypt('U2FsdGVkX1/WIeY0pM/v36A8Erhd6hIBoTvXu+M9TIQ=').should.equal('RGfuel10!');
        login_case.crypt.decrypt('U2FsdGVkX1/WIeY0pM/v36A8Erhd6hIBoTvXu+M9TIQ=').should.not.equal('RGfuel1afd0!');
    });

    it('Encryption using AES', () => {
        login_case.crypt.encrypt('RGfuel10!').should.not.equal('RGfuel10!');
        login_case.crypt.decrypt(login_case.crypt.encrypt('RGfuel10!')).should.equal('RGfuel10!');
    });
});

describe('#login.js: Login Validation (Password correctness)', () => {
    it('Correct Password', () => {
        login_case.validateAccount('RGreen', 'RGfuel10!').should.equal(true);
    });

    it('Incorrect Password', () => {
        login_case.validateAccount('RGreen', 'rgfbyh103!').should.equal(false);
    });
});

describe('#login.js: Retrieving and Processing Data From Server', () => {
    var res = login_case.getData(testJSON);
    it('JSON Object Parsed', () => {
        login_case.getData(testJSON).should.equal(res);
    });

    it('Username Correct', () => {
        login_case.getData(testJSON[0].username).should.equal(res[0].username);
    });

    it('Password Correct', () => {
        login_case.getData(testJSON[0].password).should.equal(res[0].password);
    });

    it('Address Correct', () => {
        login_case.getData(testJSON[0].address1).should.equal(res[0].address1);
    });

    it('State Correct', () => {
        login_case.getData(testJSON[0].state).should.equal(res[0].state);
    });    
});

//register_case.js Test Cases
const register_case = {
    crypt,
    validateRegistration,
    getData,
    sendData
} = require('./register_case');

describe('#register.js: Encryption/Decryption', () => {
    it('Decrypting from AES key', () => {
        register_case.crypt.decrypt('U2FsdGVkX1/WIeY0pM/v36A8Erhd6hIBoTvXu+M9TIQ=').should.equal('RGfuel10!');
        register_case.crypt.decrypt('U2FsdGVkX1/WIeY0pM/v36A8Erhd6hIBoTvXu+M9TIQ=').should.not.equal('RGfuel1afd0!');
    });

    it('Encryption using AES', () => {
        register_case.crypt.encrypt('RGfuel10!').should.not.equal('RGfuel10!');
        register_case.crypt.decrypt(register_case.crypt.encrypt('RGfuel10!')).should.equal('RGfuel10!');
    });
});

describe('#register.js: validateRegistration function', () => {
    it('Checking for available username', () => {
        register_case.validateRegistration('MScott', 'DunderScott55').should.be.true;
        register_case.validateRegistration('RGreen', 'RobertGreen2020').should.be.false;
    });
});

describe('#register.js: sendData function', () => {
    var obj = register_case.sendData('MScott', 'DunderScott55');
    it('Username sent correctly', () => {
        obj.name.should.equal('MScott');
    });

    it('Password sent correctly', () => {
        register_case.crypt.decrypt(obj.password).should.equal('DunderScott55');
    });

    it('Password sent is encrypted', () => {
        obj.password.should.not.equal('DunderScott55');
    });
});

describe('#register.js: Retrieving and Processing Data From Server', () => {
    var res = register_case.getData(testJSON);
    it('JSON Object Parsed', () => {
        register_case.getData(testJSON).should.equal(res);
    });

    it('Username Correct', () => {
        register_case.getData(testJSON[0].username).should.equal(res[0].username);
    });

    it('Password Correct', () => {
        register_case.getData(testJSON[0].password).should.equal(res[0].password);
    });

    it('Address Correct', () => {
        register_case.getData(testJSON[0].address1).should.equal(res[0].address1);
    });

    it('State Correct', () => {
        register_case.getData(testJSON[0].state).should.equal(res[0].state);
    });    
});

//user_profile.js Test Cases
const user_profile_case = {
    getData,
    populateFields,
    confirmChanges
} = require('./user_profile_case');

describe('#user_profile.js: Retrieving and Processing Data From Server', () => {
    var res = user_profile_case.getData(testJSON);
    it('JSON Object Parsed', () => {
        user_profile_case.getData(testJSON).should.equal(res);
    });

    it('Username Correct', () => {
        user_profile_case.getData(testJSON[0].username).should.equal(res[0].username);
    });

    it('Password Correct', () => {
        user_profile_case.getData(testJSON[0].password).should.equal(res[0].password);
    });

    it('Address Correct', () => {
        user_profile_case.getData(testJSON[0].address1).should.equal(res[0].address1);
    });

    it('State Correct', () => {
        user_profile_case.getData(testJSON[0].state).should.equal(res[0].state);
    });    
});


describe('#user_profile.js: populateFields function', () => {
    var obj = user_profile_case.populateFields('RGreen');
    it('Username field populated correctly', () => {
        obj.fullname.should.equal('Robert Green');
    });

    it('Address1 field populated correctly', () => {
        obj.address1.should.equal('881 Roosevelt Court');
    });

    it('Address2 field populated correctly', () => {
        obj.address2.should.equal('');
    });

    it('City field populated correctly', () => {
        obj.city.should.equal('Houston');
    });

    it('State field populated correctly', () => {
        obj.state.should.equal('TX');
    });

    it('Zipcode field populated correctly', () => {
        obj.zipcode.should.equal(77066);
    });

    it('Wrong username check', () => {
        user_profile_case.populateFields('MScott').should.be.false;
    });
});

describe('#user_profile.js: confirmChanges function', () => {
    var obj = user_profile_case.confirmChanges('RGreen');
    it('Username field populated correctly', () => {
        obj.fullname.should.equal('Robert Green');
    });

    it('Address1 field populated correctly', () => {
        obj.address1.should.equal('881 Roosevelt Court');
    });

    it('Address2 field populated correctly', () => {
        obj.address2.should.equal('');
    });

    it('City field populated correctly', () => {
        obj.city.should.equal('Houston');
    });

    it('State field populated correctly', () => {
        obj.state.should.equal('TX');
    });

    it('Zipcode field populated correctly', () => {
        obj.zipcode.should.equal(77066);
    });   
});

//quote.js Test Cases
const quote_case = {
    getData,
    calculateMargin,
    submitOrder
} = require('./quote_case');

describe('#quote.js: Retrieving and Processing Data From Server', () => {
    var res = quote_case.getData(testJSON);
    it('JSON Object Parsed', () => {
        quote_case.getData(testJSON).should.equal(res);
    });

    it('Username Correct', () => {
        quote_case.getData(testJSON[0].username).should.equal(res[0].username);
    });

    it('Password Correct', () => {
        quote_case.getData(testJSON[0].password).should.equal(res[0].password);
    });

    it('Address Correct', () => {
        quote_case.getData(testJSON[0].address1).should.equal(res[0].address1);
    });

    it('State Correct', () => {
        quote_case.getData(testJSON[0].state).should.equal(res[0].state);
    });    
});

describe('#quote.js: calculateMargin function', () => {
    var obj = quote_case.calculateMargin('RGreen', 'TX', 533);
    var obj2 = quote_case.calculateMargin('RGreen', 'OH', 533);
    var obj3 = quote_case.calculateMargin('MScott', 'TX', 533);
    var obj4 = quote_case.calculateMargin('MScott', 'OH', 533);
    it('Suggested Price Correct', () => {
        obj[0].should.equal('1.71');
        obj2[0].should.equal('1.74');
        obj3[0].should.equal('1.73');
        obj4[0].should.equal('1.75');
    });  

    it('Total Price Correct', () => {
        obj[1].should.equal('911.43');
        obj2[1].should.equal('927.42');
        obj3[1].should.equal('919.43');
        obj4[1].should.equal('935.41');
    });  
});

describe('#quote.js: submitOrder function', () => {
    var obj = quote_case.submitOrder('RGreen', 'TX', 533, '881 Roosevelt Court Houston', '2021-04-15', 1.74, 927.42);
    it('Fields sent correctly to server (database)', () => {
        obj.username.should.equal('RGreen');
        obj.gallons.should.equal(533);
        obj.state.should.equal('TX');
        obj.address.should.equal('881 Roosevelt Court Houston');
        obj.date.should.equal('2021-04-15');
        obj.gprice.should.equal(1.74);
        obj.tprice.should.equal(927.42);
    });  
});

//history.js Test Cases
const history_case = {
    getData,
    drawInformation
} = require('./history_case');

describe('#history.js: Retrieving and Processing Data From Server', () => {
    var res = history_case.getData(testJSON);
    it('JSON Object Parsed', () => {
        history_case.getData(testJSON).should.equal(res);
    });

    it('Username Correct', () => {
        history_case.getData(testJSON[0].username).should.equal(res[0].username);
    });

    it('Password Correct', () => {
        history_case.getData(testJSON[0].password).should.equal(res[0].password);
    });

    it('Address Correct', () => {
        history_case.getData(testJSON[0].address1).should.equal(res[0].address1);
    });

    it('State Correct', () => {
        history_case.getData(testJSON[0].state).should.equal(res[0].state);
    });    
});

var infoDraw = "Order 1\nAddress: 881 Roosevelt Court 77066\nState: TX\nDate: 2021-04-28\nNumber Of Gallons: 513\nPrice Per Gallon: $1.73\nTotal Price: $884.93\n";

describe('#history.js: Retrieving and Processing Data From Server', () => {
    var res = history_case.drawInformation('RGreen');
    var res2 = history_case.drawInformation('MScott');

    it('Correct number of orders displayed', () => {
        res.length.should.equal(1);
    });
    
    it('Correct number of orders displayed (no orders)', () => {
        res2.length.should.equal(0);
    });

    it('Information displayed correctly', () => {
        res[0].should.equal(infoDraw);
    });
});