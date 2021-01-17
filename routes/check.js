require('dotenv').config()
var express = require('express');
const validate = require("./validations");
var router = express.Router();
// explanation of regex https://regexr.com/5kd6h

const NUMBERS_ONLY_REGEX = /^([0-9]+)$/g
// explanation 
const QUERY_STRING_EXISTS_REGEX = /\?.+=.*/g


// checks the validity of the flags
// checks to see if the flags are correct ex:
// from user "2340956" === actual "499999" NOPE!
// from user "499999" === actual "499999" YEP!
// each flag is passed in as a query paramter

// http://localhost:3000/check/?flag1=1337 [..sniped for brevity...]
//full get call to server
//http://localhost:3000/check/?flag1=1337&flag2=1337&flag3=1337

// NOTE: flag: is defined as a string that is hidden in a cybersecurity challenge
// and when its found the flag is entered into a website and you see if you win.
router.get('/', (req, res, next) => {

    // error checking to see if you added the 3 parmaters flag1,flag2,flag3
    console.log(req.query)
    // link:
    // https://bytenota.com/javascript-check-if-url-contains-query-string/
    // scroll to the part about 2. Use Regex to check a given URL
    if (!RegExp(QUERY_STRING_EXISTS_REGEX, "g").test(req.url)) {
        return res.json({
            flag1: null,
            flag2: null,
            flag3: null,
            win: null,
            error: `ERROR: flagX paramater not found ex: localhost:3000/?flag1=1336`
        })

    }

    // validate that the flag1 paramater actually exists in the url
    if (!req.query.flag1) {
        console.log("flag1 not found")

        return res.json({
            flag1: null,
            flag2: null,
            flag3: null,
            win: null,
            error: `Error flag1 was not found in query`
        })
    }
    if (!req.query.flag2) {
        console.log("flag2 not found")
        return res.json({
            flag1: null,
            flag2: null,
            flag3: null,
            win: null,
            error: `Error flag2 was not found in query`
        })
    }
    if (!req.query.flag3) {
        console.log("flag2 not found")

        return res.json({
            flag1: null,
            flag2: null,
            flag3: null,
            win: null,
            error: `Error flag3 was not found in query`
        })
    }

    // grab the '1337' veriable part of '?flag1=1337' for reach flag
    const flag1 = req.query?.flag1;
    const flag2 = req.query?.flag2;
    const flag3 = req.query?.flag3;

    // user input validation
    // check if the flag's characters are only numbers
    if (!RegExp(NUMBERS_ONLY_REGEX, 'g').test(flag1)) {
        return res.json({
            flag1: null,
            flag2: null,
            flag3: null,
            win: null,
            error: `Error number was not entered for'flag1':"${flag1}" is not a number`
        })
    }

    if (!RegExp(NUMBERS_ONLY_REGEX, 'g').test(flag2)) {
        return res.json({
            flag1: null,
            flag2: null,
            flag3: null,
            win: null,
            error: `Error number was not entered for 'flag2':"${flag2}" is not a number`
        })
    }


    if (!RegExp(NUMBERS_ONLY_REGEX, 'g').test(flag3)) {

        return res.json({
            flag1: null,
            flag2: null,
            flag3: null,
            win: null,
            error: `Error number was not entered for 'flag3':"${flag3}" is not a number`
        })
    }

    console.log(process.env.FLAG1)
    console.log(process.env.FLAG1 === flag1);

    // winning flags example url
    // http://localhost:3000/check/?flag1=1234567890&flag2=0987654321&flag3=1111111111

    // check if the user actually got all the ones correctly!

    //explenation "process.env.FLAG1 === flag1" grabs the winning number from a 
    // enviornamental variable set in /frontend/.env which is ex:FLAG1=234567
    // flag1 is the number the user entered in on the website and was passed back through
    // a fetch call from the browser
    
    
    // if the user entered multple correct answers preventing a false win
    if(has_duplicatate_numbers){
        return res.json({
            flag1:false,
            flag2:false,
            flag3:false,
            win:false,
            error:`has duplicate answers!`})
    }
    win = false;
    return res.json({
        flag1: CORRECT_FLAGS.some(correct => correct === flag1),
        flag2: CORRECT_FLAGS.some(correct => correct === flag2),
        flag3: CORRECT_FLAGS.some(correct => correct === flag3),
        win: process.env.FLAG1 === flag1 && process.env.FLAG2 === flag2 && process.env.FLAG3 === flag3,
        error: ``
    })

});

// allows for checking just 1 flag at a time
router.get("/flag", (req, res, next) => {

    guess_val = req.query.value;
    // this is kinda complicated,
    // it allows me to check if 111111 is one of the 3 flags stored in the enviorment variables (for security)
    // it asks the question is 23242342 on of [1233333,44444,238383] => true or false
    is_correct_flag = [process.env.FLAG1, process.env.FLAG2, process.env.FLAG3].some(x => x === guess_val)
    return res.json({
        is_correct: is_correct_flag,
        error: ``
    });
});

module.exports = router;