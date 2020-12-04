import React from 'react';
import { View, Text, TextStyle, FlatList, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment-jalaali';
import { enumerateDaysBetweenDates } from './utils/helper';
import { useState } from 'react';

interface Props {
  mode: 'gregorian' | 'jalali';
  startDate: Date;
  endDate: Date;
  onSelectedDateChange: (date: Date) => void;
  initialSelectedDate?: Date;
  selectedItemWidth?: number;
  unselectedItemWidth?: number;
  itemHeight?: number;
  itemRadius?: number;
  flatListPadding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  selectedItemTextStyle?: TextStyle;
  unselectedItemTextStyle?: TextStyle;
  selectedItemBackgroundColor?: string;
  unselectedItemBackgroundColor?: string;
}

const HorizontalDatepicker = ({ mode, startDate, endDate, onSelectedDateChange }: Props) => {
  const [selectedDate, setSelectedDate] = useState(startDate)
  if (mode === 'jalali') {
    moment.loadPersian({
      dialect: 'persian-modern',
    });
  }
  const jFormat = 'dddd، jD jMMMM';
  const grFormat = 'dddd, MMM D';

  var results = enumerateDaysBetweenDates(
    startDate,
    endDate
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={results}

      scrollEventThrottle={16}
      keyExtractor={(date, index) => `${date + index}`}
      contentContainerStyle={{ backgroundColor: '#f5f5f5', height: 58, alignItems: 'center' }}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => setSelectedDate(item)}>
          {selectedDate === item ? <View style={{ width: 170, height: 38, backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
            <Text style={{ fontSize: 20, color: "#fff" }}>
              {moment(item)
                .locale(mode === 'jalali' ? 'fa' : 'en')
                .format(mode === 'jalali' ? jFormat : grFormat)}
            </Text>
          </View> : (
              <View style={{ width: 38, height: 38, borderRadius: 5, marginHorizontal: 10, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: "#000" }}>
                  {moment(item)
                    .locale(mode === 'jalali' ? 'fa' : 'en')
                    .format(mode === 'jalali' ? 'jD' : 'd')}
                </Text>
              </View>
            )}
        </TouchableWithoutFeedback>
      )}
    ></FlatList>
  );
};
export default HorizontalDatepicker;
