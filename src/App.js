import React, { Component, Fragment } from 'react';
import getInitialState from './state';
import notes from './notes';
import {
  getChordTypes,
  getAllChords,
  choose,
  without,
} from './util';
import ChordDiagrams from './ChordDiagrams';
import ChordTypesSelector from './ChordTypesSelector';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
    this.createInterval();
  }

  createInterval = () => {
    this.interval = setInterval(() => {
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

  onToggleChordType = chordOption => e => {
    const newChordOptions = {
      ...this.state.chordOptions,
      [chordOption]: e.target.checked
    };

    this.setState({
      chordOptions: newChordOptions,
      allChords: getAllChords(getChordTypes(newChordOptions), notes)
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.chord}</h1>
        <ChordDiagrams chord={this.state.chord} />
        <br/>
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
          <ChordTypesSelector
            chordOptions={this.state.chordOptions}
            onToggle={this.onToggleChordType}
          />
        </p>
      </div>
    );
  }
}

export default App;
