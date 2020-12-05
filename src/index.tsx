import React, { createRef } from 'react';
import {
  TextStyle,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment-jalaali';
import { enumerateDaysBetweenDates } from './utils/helper';
import { useState } from 'react';
import SelectedDate from './components/Selected';
import UnSelectedDate from './components/UnSelected';

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

const HorizontalDatepicker = ({
  mode,
  startDate,
  endDate,
  selectedItemTextStyle,
  selectedItemWidth = 170,
  selectedItemBackgroundColor,
  unselectedItemWidth = 38,
  unselectedItemTextStyle,
  unselectedItemBackgroundColor,
  itemRadius = 10,
  initialSelectedDate,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment(initialSelectedDate).format('YYYY-MM-DD')
  );
  const listRef = createRef<FlatList<any>>();
  if (mode === 'jalali') {
    moment.loadPersian({
      dialect: 'persian-modern',
    });
  }
  const jFormat = 'dddd، jD jMMMM';
  const grFormat = 'dddd, MMM D';

  const results = enumerateDaysBetweenDates(startDate, endDate);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={results}
      scrollEventThrottle={16}
      keyExtractor={(date, index) => `${date + index}`}
      contentContainerStyle={[styles.flatListStyle]}
      initialScrollIndex={mode === 'jalali' ? results.length - 1 : 0}
      inverted={mode === 'jalali'}
      getItemLayout={(_, index) => ({
        length: index * unselectedItemWidth,
        offset: unselectedItemWidth,
        index,
      })}
      ref={listRef}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedDate(item);
            listRef.current?.scrollToOffset({
              animated: true,
              offset: index * 38,
            });
          }}
        >
          {selectedDate === item ? (
            <SelectedDate
              text={moment(item)
                .locale(mode === 'jalali' ? 'fa' : 'en')
                .format(mode === 'jalali' ? jFormat : grFormat)}
              selectedItemWidth={selectedItemWidth}
              selectedItemTextStyle={selectedItemTextStyle}
              selectedItemBackgroundColor={selectedItemBackgroundColor}
              itemRadius={itemRadius}
            />
          ) : (
            <UnSelectedDate
              text={moment(item)
                .locale(mode === 'jalali' ? 'fa' : 'en')
                .format(mode === 'jalali' ? 'jD' : 'DD')}
              unselectedItemBackgroundColor={unselectedItemBackgroundColor}
              unselectedItemTextStyle={unselectedItemTextStyle}
              unselectedItemWidth={unselectedItemWidth}
              itemRadius={itemRadius}
            />
          )}
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};
const styles = StyleSheet.create({
  flatListStyle: {
    backgroundColor: '#f5f5f5',
    height: 58,
    alignItems: 'center',
  },
  jalaliDirection: {
    // flexDirection: 'row-reverse',
  },
});
export default HorizontalDatepicker;
