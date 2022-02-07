import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckMark = () => (
  <Svg width={14} height={13} fill="none">
    <Path stroke="#514D47" d="M13 1 4.75 12 1 7" />
  </Svg>
);

export default CheckMark;
