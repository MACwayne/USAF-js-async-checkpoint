// This project will evaluate your ability to work with asynchronous, non-blocking Javascript code.

// You will be:

// processing file data
// processing API data
// Submitting the project:

// Create a new repository named USAF-js-async-checkpoint to submit your code for this project.
// Submit a link to your respository below.
// Project instructions

// Create a command line application that processes a file list of pokemon names (each name seperated by a new line) and logs each Pokemon's types (for some there are many) according to the pokeapi.co API.
// This is an assessment of both your understanding of the course material so far and your ability to independently problem solve and use the internet/other resources to implement anything you don't understand.
// Example file input (input.txt)

// charizard
// pikachu
// Example console output:

// Charizard: flying, fire
// Pikachu: electric

var fs = require("fs");
const fetch = require('node-fetch')

var inputFile;

process.argv.forEach(function (val, index, array) {
    if (index === 2) {
        inputFile = val;
    }
});

//console.log(inputFile);

var text = fs.readFileSync("./" + inputFile).toString('utf-8');


text = text.split("\n")
var pokemon = []

for (index in text) {
    pokemon.push(text[index])
    fetch('https://pokeapi.co/api/v2/pokemon/' + text[index] + '/')
        .then(response => {
            return response.json()
        })
        .then(data => {
            var returnTypes = []
            for (type of data.types) {
                returnTypes.push(type.type.name)
                //console.log("type: " + JSON.stringify(type.type.name))
            }
            
            console.log(pokemon[index] + ": "+ returnTypes)
            //returnTypes = []
            //console.log(JSON.stringify(data.types));
        //type = JSON.stringify(data.types)
        })
        // .then(function () {
        //     for (index in text ) {
        //         console.log(text[index] + ": " + returnTypes)
        //     }
        //   })
}


//console.log(type)

// function(input) {

// }

// fs.readFile("./mytext.txt", function(text){
//     var textByLine = text.split("\n")
// });