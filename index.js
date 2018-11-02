var wordGet = require("./word.js");
var inquirer = require("inquirer");
var gameOver = false;
var guessedLetters = new Set();
var word = new wordGet();
var totalGuess = word.letters.length + 5; //10;
var remainedLetters = word.letters.length;

function runGame() {
    
    word.showLetters();
    inquirer.prompt([
               {
            type: "input",
            name: "letter",
            message: "Type a letter to make a guess"
        }
    ]).then(function (response) {
       
        guess(response.letter.toLowerCase());
        if (!gameOver) {
            runGame();
        } else {
            restartGame();
        }
    })
}


runGame();


function guess(letter) {
    if (letter.length === 1) {
        if (!guessedLetters.has(letter)) {
            guessedLetters.add(letter);
        }
        else {
            console.log(`You've already guessed ${letter}, try again!\n`);
            return;
        }
        var rightGuess = word.guessChecker(letter);
        console.log(rightGuess);
        if (rightGuess > 0) {
            console.log("Awesome!\n");
            console.log(totalGuess + " guesses remaining\n");
            remainedLetters -= rightGuess;
        }
        else {
            totalGuess--;
            console.log("Incorrect!  " + totalGuess + " guesses remaining\n");
        }

        if (remainedLetters === 0) {
            console.log("\n------------\n");
            console.log("You win!");
            console.log("\n------------\n");
            word.showLetters();
            gameOver = true;
        }

        if (totalGuess === 0) {
            console.log("\n------------\n");
            console.log("You lose!");
            console.log("Word was " + word.word)
            console.log("\n------------\n");
            gameOver = true;

        }

    }
    else {
        console.log("Please type a single letter at a time!\n");
    }


}



function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                gameOver = false;
                guessedLetters = new Set();
                word = new wordGet();
                totalGuess = word.letters.length + 5; 
                remainedLetters = word.letters.length;
                runGame();
            } else {
                console.log("Thanks for playing! See you later!")
                return
            }
        })
}