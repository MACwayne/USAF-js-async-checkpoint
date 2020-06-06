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

var pokemonList = fs.readFileSync("./" + inputFile).toString('utf-8').split("\n");
var promiseList = [];

for (pokemon of pokemonList) {
    promiseList.push(fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon + '/'))
}

var output = []

Promise.all(promiseList)
    .then(result => Promise.all(result.map(v => v.json())))
    .then(results =>  {
        for (result of results) {
            var types = [];
            for (type of result.types) {
                types.push(type.type.name)
            }
            output[result.name] = types;
        }
    })
    .then(results => {
        for (pokemon of pokemonList) {
            console.log (pokemon.charAt(0).toUpperCase() + pokemon.slice(1) + ": " + output[pokemon].join(', '))
        }
    })
    .catch((err) => {
        console.log(err);
    });
