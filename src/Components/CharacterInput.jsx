import React, { Component } from 'react';

class CharacterInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCharacter: ''
    };

    this.handleInputCharacterChange = this.handleInputCharacterChange.bind(this);
  }

  handleInputCharacterChange(event) {
    const char = event.target.value.toUpperCase();

    // the user can only enter one character at a time
    if (char.length > 1) {
      return;
    }

    this.setState({
      currentCharacter: char
    });
  }

  render() {
    const { currentCharacter } = this.state;
    const { handleSubmitCharClick } = this.props;

    return (
      <div className="char-input">
        <input 
          type="text" 
          value={currentCharacter} 
          onChange={this.handleInputCharacterChange} />
        <button
          type="submit"
          placeholder="Insert a character..."
          onClick={(e) => {
            handleSubmitCharClick(e, currentCharacter);
            this.setState({
              currentCharacter: ''
            });
          }}>
          Guess!
        </button>
      </div>
    );
  }
}

export default CharacterInput;
