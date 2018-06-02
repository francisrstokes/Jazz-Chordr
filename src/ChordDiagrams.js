import React, {Fragment} from 'react';
import images from './images';
import {getChordVariationType} from './util';

export default ({ chord, variation }) =>
  <Fragment>
    <img
      src={images[`${getChordVariationType(chord)}_a`]}
      height={291}
      width={225}
    />
    <img
      src={images[`${getChordVariationType(chord)}_b`]}
      height={291}
      width={225}
    />
    <br/>
  </Fragment>;
