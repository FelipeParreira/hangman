import React from 'react';
import PropTypes from 'prop-types';

const ScoreTable = props => {
  const { scores } = props;

  return (
    <div className="score-table">
      <table>
        <thead>
          <caption>Score Table</caption>
          <tr>
            <th>Wrong Guesses</th>
            <th>Word</th> 
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {scores.reverse().map(score => (
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

ScoreTable.propTypes = {
  scores: PropTypes.array
};

export default ScoreTable;
