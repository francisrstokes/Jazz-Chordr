import React, { Component } from 'react';
import './App.css';

const chords = [
  'maj7',
  'min7',
  '7',
  'dim7',
  'min7b5',
  'min7b5',
];

const notes = [
  'A',
  'Bb',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'Eb',
  'F',
  'F#',
  'G',
  'G#'
];

const allChords = notes.reduce((acc, note) => {
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
    this.state = {
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
    return choose(without(this.state.chord, allChords));
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.chord}</h1>
        <button onClick={() => this.setState({chord: this.getNextChord()})}>Next chord in {this.state.timer}</button>
        <hr/>
        {this.state.timerLength} seconds between chords:<br/>
        <input
          type="range"
          step={1}
          min={1}
          max={10}
          value={this.state.timerLength}
          onChange={e => this.setState({timerLength: e.target.value})}
        />
      </div>
    );
  }
}

export default App;
