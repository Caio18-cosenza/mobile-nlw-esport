import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { THEME } from '../../theme';

import { styles } from './styles';

interface LoadingProps {}

export const Loading = ({}: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={THEME.COLORS.PRIMARY} />
    </View>
  );
};
