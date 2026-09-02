import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

interface SelectedDateProps {
  text: string;
  selectedItemWidth?: number;
  selectedItemTextStyle?: TextStyle;
  selectedItemBackgroundColor?: string;
  itemRadius?: number;
  itemHeight?: number;
  itemSpacing?: number;
}

const SelectedDate: React.FC<SelectedDateProps> = ({
  text,
  selectedItemWidth = 170,
  selectedItemTextStyle,
  selectedItemBackgroundColor = '#16213e',
  itemRadius,
  itemHeight,
  itemSpacing = 10,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: selectedItemWidth,
          backgroundColor: selectedItemBackgroundColor,
          borderRadius: itemRadius,
          height: itemHeight,
          marginHorizontal: itemSpacing,
        },
      ]}
    >
      <Text style={[styles.text, selectedItemTextStyle]}>{text}</Text>
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
    color: '#fff',
  },
});

export default SelectedDate;
