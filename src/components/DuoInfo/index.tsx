import React from 'react';
import { View, Text, ColorValue } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

interface DuoInfoProps {
  label: string;
  value: string;
  colorValue?: ColorValue;
}

export const DuoInfo = ({
  label,
  value,
  colorValue = THEME.COLORS.TEXT,
}: DuoInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text numberOfLines={1} style={[styles.value, { color: colorValue }]}>
        {value}
      </Text>
    </View>
  );
};
