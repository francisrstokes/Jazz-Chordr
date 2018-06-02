import React, {Fragment} from 'react';

export default ({ chordOptions, onToggle }) =>
  Object.keys(chordOptions).map(chordOption =>
    <Fragment key={chordOption}>
      {chordOption}: <input
        type="checkbox"
        defaultChecked={chordOptions[chordOption]}
        onChange={onToggle(chordOption)}
      /> &nbsp;
    </Fragment>
  );
