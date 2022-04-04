//npm -y init
//npm i express
//npm install nodemon --save-dev
//had to add "start" : "nodemon helper.js" for some reason

// // instructions pt1
// Write a command line application called helper.js which Scully can use to find all
//  sightings within a given state. Have the application take one command line argument
//   which contains the name of the state and log to the console a summary of each 
//   sighting in that state. For example:
// =====================
// Date: 1/31/15/ 21:30
// City: Conway
// State: SC
// Shape: Fireball
// Duration: 5 Minutes
// ====================
// Date: 1/27/15 20:00
// City: Myrtle Beach
// State: SC
// Shape: Changing
// Duration: 10 Seconds
// ====================

//Rich: okay, i have an external json file, i wonder how i open it
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/

const fs = require('fs');

let rawdata = fs.readFileSync('sightings.json');
let sightings = JSON.parse(rawdata);
// console.log(sightings);

//Awesome! logs it just fine! Cool now I don't have to paste the sightings data in here.

//from above
//Have the application take one command line argument
//which contains the name of the state
//so something like state=ca?

//okay, need to figure out how to take command line arguments...
// https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line
//example command
// node app.js state=ca

//this is how you get arguments passed, arguments start at 2 in the array index returned by argv
// const argsTest = process.argv.slice(2)
// console.log(argsTest)
//returns [ '--state=ca' ]

//args[0] is name=joe, and you need to parse it. 
//The best way to do so is by using the minimist library, which helps dealing with arguments:
//install it
//npm i minimist
//then use this syntax for the args, the --doubledash
//node helper.js --state=ca
// const argsTest = require('minimist')(process.argv.slice(2))
// console.log(argsTest['state'])
//returns ca
//seems to work!

//whats next?
// log to the console a summary of each sighting in that state. For example:
// =====================
// Date: 1/31/15/ 21:30
// City: Conway
// State: SC
// Shape: Fireball
// Duration: 5 Minutes
// =====================

//okay, sightings.json is an array, the first element is like this
// {
//     "date": "1/31/15 22:00",
//     "city": "Lancaster",
//     "state": "CA",
//     "shape": "Sphere",
//     "duration": "several minutes",
//     "description": "Orange lights."
// },

//lets pull our arguments
let arguments = require('minimist')(process.argv.slice(2))
let state = arguments['state']

//so we need a for of to loop through the array
//if the state is same as arg, display it using logs
function sightingsByState() {
    if (state.length != 2) {
        console.log("State must be two characters")
    } else {
        for (let sighting of sightings) {
            if (sighting.state === state.toUpperCase()) {
                console.log(`=====================`)
                console.log(`Date: ${sighting.date}`)
                console.log(`City: ${sighting.city}`)
                console.log(`State: ${sighting.state}`)
                console.log(`Shape: ${sighting.shape}`)
                console.log(`Duration: ${sighting.duration}`)
                // console.log(`Description: ${sighting.description}`)
            }
        }
        console.log(`=====================`)
    }
}
//to make this work, uncomment this
// sightingsByState()
// and run it with this in terminal
// node helper.js --state=ca


//next exercise
// Find all the UFO sightings in that state (arkansas) for the past year to help out your new colleagues.
let year = arguments['year'] //needs to be two digit parameter from user

// to do this we need to parse the year string
// "date": "1/31/15 22:00",
//hmmm how do we pull the year.... probably by parsing the string up until the first space
//use indexOf(" ") for this, will return the location of the first space
function sightingsByStateAndYear() {
    if (state.length != 2 || year.length != 2) {
        console.log("Year must be a two digit parameter, state must be two characters") 
        //tests for wrong year, state , if true then errors
    } else {
        for (let sighting of sightings) {
            let space = sighting.date.indexOf(" ") //index of the space
            let yearString = sighting.date.slice(space - 2, space) //slice of the date string for year
            //if with and
            if (sighting.state === state.toUpperCase() && year === parseInt(yearString)) {
                console.log(`=====================`)
                console.log(`Date: ${sighting.date}`)
                console.log(`City: ${sighting.city}`)
                console.log(`State: ${sighting.state}`)
                console.log(`Shape: ${sighting.shape}`)
                console.log(`Duration: ${sighting.duration}`)
                // console.log(`Description: ${sighting.description}`)
            }
        }
        console.log(`=====================`)
    }
}
//uncomment this to run it
// sightingsByStateAndYear()
//use this to test in terminal
//node helper.js --state:ca --year:15







