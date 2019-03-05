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
      <div>
        <input 
          type="text" 
          value={currentCharacter} 
          onChange={this.handleInputCharacterChange}>
        </input>
        <button
          type="submit"
          placeholder="Insert a character..."
          onClick={(e) => {
            handleSubmitCharClick(e, currentCharacter);
            this.setState({
              currentCharacter: ''
            });
          }}
        >
          Submit!
        </button>
      </div>
    );
  }
}

export default CharacterInput;
