# Hangman
This is a front end Hangman game, built with React to be played in the browser.

## Game rules
1. The game chooses a valid English word;
2. The player has to guess the word, one letter at a time;
3. The amount of guesses for each game roughly equals 90% of the number of characters in the word;
4. If the player guesses a letter which exists in the word, the game writes it in the correct position;
5. All wrong letter guesses are displayed;
6. When the player runs out of guesses, the game ends;
7. Guesses of characters previously guessed are not considered;
8. The game keeps track of the scores of previous turns;
9. The player can restart the game (just click the button) as many times as (s)he wants. Each time, a new word is chosen;
10. The word chosen has a possible maximum number of characters that increases with the level of difficulty chosen each time;
11. Refresh the page in order to erase the score table.

## How to get it running
1. Download or clone the repo to your local machine;
2. Navigate to the root folder of the repo using the command line;
3. Run `npm install` (to install all dependencies);
4. Run `npm start` (to start the local server);
5. Go to `localhost:3000` in your browser of choice;
6. Have fun!

** P.S.: You need to have [`node.js`](https://nodejs.org/en/) installed in your machine.
