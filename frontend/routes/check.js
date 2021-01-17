require('dotenv').config()
var express = require('express');

var router = express.Router();
// explanation of regex https://regexr.com/5kd6h

const NUMBERS_ONLY_REGEX = /^([0-9]+)$/g
// explanation 
const QUERY_STRING_EXISTS_REGEX = /\?.+=.*/g


// checks the validity of the flags
// checks to see if the flags are correct ex:
// from user "2340956" == actual "499999" NOPE!
// from user "499999" == actual "499999" YEP!
// each flag is passed in as a query paramter

// http://localhost:3000/check/?flag1=1337 [..sniped for brevity...]
//full get call to server
//http://localhost:3000/check/?flag1=1337&flag2=1337&flag3=1337

// NOTE: flag: is defined as a string that is hidden in a cybersecurity challenge
// and when its found the flag is entered into a website and you see if you win.
router.get('/', function (req, res, next) {

    // error checking to see if you added the 3 parmaters flag1,flag2,flag3
    console.log(req.query)
    // link:
    // https://bytenota.com/javascript-check-if-url-contains-query-string/
    // scroll to the part about 2. Use Regex to check a given URL
    if (!RegExp(QUERY_STRING_EXISTS_REGEX, "g").test(req.url)) {
        return res.render('error', {
            message: `ERROR: flagX paramater not found ex: localhost:3000/?flag1=1336`
        });

    }

    // validate that the flag1 paramater actually exists in the url
    if (!req.query.flag1) {
        console.log("flag1 not found")
        return res.render('error', {
            message: `Error flag1 was not found in query`
        });
    }
    if (!req.query.flag2) {
        console.log("flag2 not found")

        return res.render('error', {
            message: `Error flag2 was not found in query`
        });
    }
    if (!req.query.flag3) {
        console.log("flag2 not found")

        return res.render('error', {
            message: `Error flag3 was not found in query`
        });
    }

    // grab the '1337' veriable part of '?flag1=1337' for reach flag
    const flag1 = req.query?.flag1;
    const flag2 = req.query?.flag2;
    const flag3 = req.query?.flag3;

    if (!RegExp(NUMBERS_ONLY_REGEX, 'g').test(flag1)) {
        return res.render('error', {
            message: `Error number was not entered for 'flag1':"${flag1}" is not a number`
        });
    }

    if (!RegExp(NUMBERS_ONLY_REGEX, 'g').test(flag2)) {
        return res.render('error', {
            message: `Error number was not entered for 'flag2':"${flag2}" is not a number`
        });
    }


    if (!RegExp(NUMBERS_ONLY_REGEX, 'g').test(flag3)) {
        return res.render('error', {
            message: `Error number was not entered for 'flag3':"${flag3}" is not a number`
        });
    }

    // check if the user actually got all the ones correctly!
    console.log(process.env.FLAG1)
    // if(process.env)
    console.log(process.env.FLAG1 == flag1);

    // winning flags example url
    // http://localhost:3000/check/?flag1=1234567890&flag2=0987654321&flag3=1111111111
    res.json({
        flag1: process.env.FLAG1 == flag1,
        flag2: process.env.FLAG2 == flag2,
        flag3: process.env.FLAG3 == flag3,
        win:  process.env.FLAG1 == flag1 && process.env.FLAG2 == flag2 && process.env.FLAG3 == flag3
    })
    //   res.send('respond with a resource');
    return res.render('index', {
        title: "Puzzle"
    });

});

module.exports = router;