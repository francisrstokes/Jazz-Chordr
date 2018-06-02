export const getChordTypes = toggledChords =>
  Object.entries(toggledChords).reduce((acc, [key, value]) =>
    [...acc, ...(value ? [key] : [])], []);

export const getAllChords = (chords, notes) => notes.reduce((acc, note) => {
  return [
    ...acc,
    ...chords.map(chord => `${note}${chord}`)
  ];
}, []);

export const getChordVariationType = chord => chord.split(/[A-G][#b]?/)[1];

export const choose = arr => arr[ Math.floor(Math.random() * arr.length) ];
export const without = (el, arr) => arr.filter(e => e !== el);