import React, { Component, Fragment } from 'react';
import './App.css';

const notes = ['A','Bb','B','C','C#','D','Eb','E','F','F#','G','Ab'];

const getChordTypes = toggledChords =>
  Object.entries(toggledChords).reduce((acc, [key, value]) =>
    [...acc, ...(value ? [key] : [])], []);

const getAllChords = (chords, notes) => notes.reduce((acc, note) => {
  return [
    ...acc,
    ...chords.map(chord => `${note}${chord}`)
  ];
}, []);

const choose = arr => arr[ Math.floor(Math.random() * arr.length) ];
const without = (el, arr) => arr.filter(e => e !== el);

class App extends Component {
  constructor(props) {
    super(props);

    const initialChordOptions = {
      'maj7': true,
      'min7': true,
      '7': true,
      'dim7': true,
      'min7b5': true,
    };

    const allChords = getAllChords(getChordTypes(initialChordOptions), notes);

    this.state = {
      chordOptions: initialChordOptions,
      allChords,
      chord: choose(allChords),
      timer: 5,
      timerLength: 5
    };

    setInterval(() => {
      if (this.state.timer - 1 <= 0) {
        this.setState({
          timer: this.state.timerLength,
          chord: this.getNextChord()
        });
      } else {
        this.setState({timer: this.state.timer - 1});
      }
    }, 1000);
  }

  getNextChord = () => {
    return choose(without(this.state.chord, this.state.allChords));
  }

  onToggleChordType = chordOption => e => this.setState({
    chordOptions: {
      ...this.state.chordOptions,
      [chordOption]: e.target.checked
    }
  }, () => {
    this.setState({
      allChords: getAllChords(getChordTypes(this.state.chordOptions), notes)
    });
  });

  render() {
    return (
      <div className="App">
        <h1>{this.state.chord}</h1>
        <button
          onClick={() => this.setState({chord: this.getNextChord(), timer: this.state.timerLength})}
        >Next chord in {this.state.timer}</button>
        <hr/>
        {this.state.timerLength} seconds between chords:<br/>
        <input
          type="range"
          step={1}
          min={1}
          max={15}
          value={this.state.timerLength}
          onChange={e => this.setState({timerLength: e.target.value})}
        />
        <p>
          {
            Object.keys(this.state.chordOptions).map(chordOption =>
              <Fragment key={chordOption}>
                {chordOption}: <input
                  type="checkbox"
                  defaultChecked={this.state.chordOptions[chordOption]}
                  onChange={this.onToggleChordType(chordOption)}
                /> &nbsp;
              </Fragment>
            )
          }
        </p>
      </div>
    );
  }
}

/* onChange= */

export default App;
