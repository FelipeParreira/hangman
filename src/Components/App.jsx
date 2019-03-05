import React, { Component } from 'react';
import randomWords from 'random-words';
import CharacterInput from './CharacterInput.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guessesLeft: 0,
      currentWord: {},
      wrongChars: new Set(),
      displayedChars: [],
      blockInput: false,
      wins: 0,
      losses: 0,
      level: 'easy',
      lengths: {
        easy: { maxLength: 5 },
        medium: { maxLength: 9 },
        hard: { maxLength: 15 }
      },
      scores: []
    };

    this.handleSubmitCharClick = this.handleSubmitCharClick.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  componentDidMount() {
    this.restartGame(); 
  }

  restartGame() {
    const lengthsPerLevel = this.state.lengths[this.state.level];
    const randomWord = randomWords({ exactly: 1, ...lengthsPerLevel })[0].toUpperCase();
    const currentWord = { word: randomWord };

    for (let i = 0; i < randomWord.length; i++) {
      const char = randomWord[i];
      if (!currentWord[char]) currentWord[char] = [];
      currentWord[char].push(i);
    }

    this.setState({
      guessesLeft: Math.ceil(0.6 * randomWord.length),
      currentWord,
      displayedChars: new Array(randomWord.length).fill('__'),
      wrongChars: new Set(),
      blockInput: false
    });
  }

  handleSubmitCharClick(event, char) {
    event.preventDefault();
    let { blockInput, scores, currentWord, guessesLeft, wrongChars, displayedChars, wins, losses } = this.state;

    // exit the function if the char has already been tried
    if (char !== '' && char !== '__' && (wrongChars.has(char) || displayedChars.includes(char))) return;

    if (currentWord[char]) {

      displayedChars = displayedChars.slice();
      for (let index of currentWord[char]) {
        displayedChars[index] = char;
      }

      currentWord = { ...currentWord };
      delete currentWord[char];

      // check if all chars have been correctly guessed 
      // (the only property that remains is the word itself)
      if (Object.keys(currentWord).length === 1) {
        wins++;

        scores = scores.concat({ 
          wrongGuesses: Array.from(wrongChars), 
          word: currentWord.word,
          won: true 
        });

        this.setState({
          scores,
          wins
        });

        window.alert(`YOU WON! The word was ${currentWord.word}`);
        this.restartGame();

      } else {
        this.setState({
          currentWord,
          displayedChars
        });
      }

    } else {
      if (guessesLeft === 1) {
        losses++;
        scores = scores.concat({ 
          wrongGuesses: Array.from(wrongChars), 
          word: currentWord.word,
          won: false
        });
      }

      guessesLeft && guessesLeft--;
      wrongChars = new Set(wrongChars);
      wrongChars.add(char);

      this.setState({
        guessesLeft,
        wrongChars,
        scores,
        losses
      });

      if (!guessesLeft) {
        window.alert(`GAME OVER! The word was ${currentWord.word}`);
        this.restartGame();
      }
      
    }

    console.log('scores inside', scores);
  }

  handleLevelChange(event) {
    event.preventDefault();
    this.setState({
      level: event.target.value
    });
  }

  render() {
  const { scores, currentWord, guessesLeft, wrongChars, displayedChars, wins, losses } = this.state;
  console.log('currentWord', currentWord);
  
  return (
      <div>
        <div>Played: {wins + losses} | Wins: {wins} | Losses: {losses}</div>
        <div>Guesses Left: {guessesLeft}</div>
        <div>Wrong characters: 
          {Array.from(wrongChars).map((char, index) => (<span key={char + index}>{char} </span>))}
        </div>
        <div>
          {displayedChars.map((char, index) => <span key={char + index}>{char} </span>)}
        </div>
        <CharacterInput handleSubmitCharClick={this.handleSubmitCharClick}/>
        <select onChange={this.handleLevelChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={(e) => this.restartGame()}>Restart game!</button>
        <div>
          <h3>Score Table</h3>
          <table>
            <thead>
              <tr>
                <th>Wrong Guesses</th>
                <th>Word</th> 
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              { scores.map(score => (
                <tr key={score.word}>
                  <td>{score.wrongGuesses.length}</td>
                  <td>{score.word}</td> 
                  <td>{score.won ? 'won' : 'lost'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
