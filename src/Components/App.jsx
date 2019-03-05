import React, { Component } from 'react';
import randomWords from 'random-words';
import CharacterInput from './CharacterInput.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guessesLeft: 7,
      currentWord: {},
      wrongChars: {},
      displayedChars: [],
      blockInput: false,
      correctGuesses: 0,
      score: {
        wins: 0,
        losses: 0
      }
    };

    this.handleSubmitCharClick = this.handleSubmitCharClick.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  componentDidMount() {
    this.restartGame(); 
  }

  restartGame() {
    const randomWord = randomWords().toUpperCase();
    let currentWord = {};

    for (let i = 0; i < randomWord.length; i++) {
      const char = randomWord[i];
      if (!currentWord[char]) currentWord[char] = [];
      currentWord[char].push(i);
    }

    this.setState({
      guessesLeft: 7,
      currentWord,
      displayedChars: new Array(randomWord.length).fill('__'),
      wrongChars: {},
      blockInput: false,
      correctGuesses: 0
    });
  }

  handleSubmitCharClick(event, char) {
    event.preventDefault();
    let { currentWord, guessesLeft, wrongChars, displayedChars, correctGuesses } = this.state;

    if (currentWord[char]) {
      correctGuesses++;
      if (correctGuesses === currentWord.length) {
        this.setState({
          blockInput: true
        });
      }

      displayedChars = displayedChars.slice();
      for (let index of currentWord[char]) {
        displayedChars[index] = char;
      }

      delete currentWord[char];

      this.setState({
        displayedChars,
        correctGuesses
      });

    } else {
      guessesLeft && guessesLeft--;

      if (!guessesLeft) {
        window.alert('GAME OVER!');
      }

      this.setState({
        guessesLeft,
        wrongChars: {...wrongChars, [char]: true}
      });
      
    }
  }

  render() {
  const { currentWord, guessesLeft, wrongChars, displayedChars, score } = this.state;
  console.log('word', currentWord);

  return (
      <div>
        <div>Wins: {score.wins} Losses: {score.losses}</div>
        <div>Guesses Left: {guessesLeft}</div>
        <div>Wrong characters: 
          {Object.keys(wrongChars).map((char, index) => (<span key={char + index}>{char} </span>))}
        </div>
        <div>
          {displayedChars.map((char, index) => <span key={char + index}>{char} </span>)}
        </div>
        <CharacterInput handleSubmitCharClick={this.handleSubmitCharClick}/>
        <button onClick={(e) => this.restartGame()}>Restart game!</button>
      </div>
    );
  }
}

export default App;
