import React from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';

import BackgroundImg from '../../assets/background-galaxy.png';

interface BackgroundProps {
  children?: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <ImageBackground
      source={BackgroundImg}
      defaultSource={BackgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
};
