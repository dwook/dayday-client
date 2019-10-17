import React from 'react';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';

export const HomeIcon = props => (
  <Container>
    <Svg
      width={24}
      height={24}
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <Path d="M9 22V12h6v10" />
    </Svg>
  </Container>
);

export const TypeIcon = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="#4f4f4f"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M4 7V4h16v3M9 20h6M12 4v16" />
  </Svg>
);

export const WriteIcon = props => (
  <Container>
    <Svg
      width={36}
      height={36}
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </Svg>
  </Container>
);

export const MenuIcon = props => (
  <Container>
    <Svg
      width={24}
      height={24}
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Path d="M3 12h18M3 6h18M3 18h18" />
    </Svg>
  </Container>
);

export const RecordIcon = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="#eb5757"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <Path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
  </Svg>
);

const Container = styled.View`
  padding-bottom: 10px;
`;
