import {
  getAllChords,
  getChordTypes,
  choose,
} from './util';

import notes from './notes';

export default () => {
  const initialChordOptions = {
    'maj7': true,
    'min7': true,
    '7': true,
    'dim7': true,
    'min7b5': true,
  };

  const allChords = getAllChords(getChordTypes(initialChordOptions), notes);

  return {
    chordOptions: initialChordOptions,
    allChords,
    chord: choose(allChords),
    timer: 5,
    timerLength: 5
  };
};
