import React from 'react';

const ScoreTable = props => {
  const { scores } = props;

  return (
    <div className="score-table">
      <caption>Score Table</caption>
      <table>
        <thead>
          <tr>
            <th>Wrong Guesses</th>
            <th>Word</th> 
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(score => (
            <tr key={score.word}>
              <td>{score.wrongGuesses.length}</td>
              <td>{score.word}</td> 
              <td>{score.won ? 'won' : 'lost'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
