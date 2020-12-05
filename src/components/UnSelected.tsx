import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
interface UnSelectedDateProps {
  text: string;
  unselectedItemWidth?: number;
  unselectedItemTextStyle?: TextStyle;
  unselectedItemBackgroundColor?: string;
  itemRadius?: number;
}

const UnSelectedDate: React.FC<UnSelectedDateProps> = ({
  text,
  unselectedItemWidth = 38,
  unselectedItemTextStyle = styles.selectedDateText,
  unselectedItemBackgroundColor = '#fff',
  itemRadius,
}) => {
  return (
    <View
      style={[
        styles.selectedDateContainer,
        {
          width: unselectedItemWidth,
          backgroundColor: unselectedItemBackgroundColor,
          borderRadius: itemRadius,
        },
      ]}
    >
      <Text style={[styles.selectedDateText, unselectedItemTextStyle]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedDateContainer: {
    width: 38,
    height: 38,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#16213e',
  },
});

export default UnSelectedDate;
