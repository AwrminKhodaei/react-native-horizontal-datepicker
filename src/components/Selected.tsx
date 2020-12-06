import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
interface SelectedDateProps {
  text: string;
  selectedItemWidth?: number;
  selectedItemTextStyle?: TextStyle;
  selectedItemBackgroundColor?: string;
  itemRadius?: number;
  itemHeight?: number;
}
const SelectedDate: React.FC<SelectedDateProps> = ({
  text,
  selectedItemWidth = 170,
  selectedItemTextStyle = styles.selectedDateText,
  selectedItemBackgroundColor = '#16213e',
  itemRadius,
  itemHeight,
}) => {
  return (
    <View
      style={[
        styles.selectedDateContainer,
        {
          width: selectedItemWidth,
          backgroundColor: selectedItemBackgroundColor,
          borderRadius: itemRadius,
          height: itemHeight,
        },
      ]}
    >
      <Text style={[selectedItemTextStyle, styles.selectedDateText]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedDateContainer: {
    width: 170,

    backgroundColor: '#16213e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 10,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SelectedDate;
