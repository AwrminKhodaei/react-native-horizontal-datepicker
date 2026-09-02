import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

interface UnSelectedDateProps {
  text: string;
  unselectedItemWidth?: number;
  unselectedItemTextStyle?: TextStyle;
  unselectedItemBackgroundColor?: string;
  itemRadius?: number;
  itemHeight?: number;
  itemSpacing?: number;
}

const UnSelectedDate: React.FC<UnSelectedDateProps> = ({
  text,
  unselectedItemWidth = 38,
  unselectedItemTextStyle,
  unselectedItemBackgroundColor = '#fff',
  itemRadius,
  itemHeight,
  itemSpacing = 10,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: unselectedItemWidth,
          backgroundColor: unselectedItemBackgroundColor,
          borderRadius: itemRadius,
          height: itemHeight,
          marginHorizontal: itemSpacing,
        },
      ]}
    >
      <Text style={[styles.text, unselectedItemTextStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#16213e',
  },
});

export default UnSelectedDate;
