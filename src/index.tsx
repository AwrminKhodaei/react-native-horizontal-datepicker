import React, { createRef, useState } from 'react';
import {
  TextStyle,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import moment, { Moment } from 'moment-jalaali';
import SelectedDate from './components/Selected';
import UnSelectedDate from './components/UnSelected';
import { enumerateDaysBetweenDates } from './utils/helper';

interface Props {
  mode: 'gregorian' | 'jalali';
  startDate: Date | Moment;
  endDate: Date | Moment;
  onSelectedDateChange: (date: Date) => void;
  initialSelectedDate?: Date;
  selectedItemWidth?: number;
  unselectedItemWidth?: number;
  itemHeight?: number;
  itemRadius?: number;
  selectedItemTextStyle?: TextStyle;
  unselectedItemTextStyle?: TextStyle;
  selectedItemBackgroundColor?: string;
  unselectedItemBackgroundColor?: string;
  flatListContainerStyle?: ViewStyle;
}
const HorizontalDatepicker: React.FC<Props> = ({
  mode,
  startDate,
  endDate,
  onSelectedDateChange,
  initialSelectedDate,
  selectedItemWidth = 170,
  unselectedItemWidth = 38,
  itemHeight = 38,
  itemRadius = 10,
  selectedItemTextStyle,
  unselectedItemTextStyle,
  selectedItemBackgroundColor,
  unselectedItemBackgroundColor,
  flatListContainerStyle,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment(initialSelectedDate).format('YYYY-MM-DD')
  );
  // Ref used to handle scroll to specific index
  const listRef = createRef<FlatList<any>>();
  // use modern month names in jalali mode
  if (mode === 'jalali') {
    moment.loadPersian({
      dialect: 'persian-modern',
    });
  }
  // format to show date in jalali mode
  const jFormat = 'dddd، jD jMMMM';
  // format to show date in gregorian mode
  const grFormat = 'dddd, MMM D';
  // get dates between startDate and endDate
  const results = enumerateDaysBetweenDates(startDate, endDate);
  // handle press on date item, set selectedDate and call onSelectedDateChange with Date constractor
  const onDateItemPress = (item: string, index: number) => {
    setSelectedDate(item);
    onSelectedDateChange(new Date(item));
    listRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };
  // render Date items here
  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity onPress={() => onDateItemPress(item, index)}>
      {selectedDate === item ? (
        <SelectedDate
          text={moment(item)
            .locale(mode === 'jalali' ? 'fa' : 'en')
            .format(mode === 'jalali' ? jFormat : grFormat)}
          selectedItemWidth={selectedItemWidth}
          selectedItemTextStyle={selectedItemTextStyle}
          selectedItemBackgroundColor={selectedItemBackgroundColor}
          itemRadius={itemRadius}
          itemHeight={itemHeight}
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
          itemHeight={itemHeight}
        />
      )}
    </TouchableOpacity>
  );
  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        scrollEventThrottle={16}
        keyExtractor={(date, index) => `${date + index}`}
        contentContainerStyle={[styles.flatListStyle, flatListContainerStyle]}
        // invert flatlist when mode is jalali
        initialScrollIndex={0}
        inverted={mode === 'jalali'}
        ref={listRef}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: unselectedItemWidth * (index + 1) + 40,
          index,
        })}
      />
    </>
  );
};
const styles = StyleSheet.create({
  flatListStyle: {
    backgroundColor: '#f5f5f5',
    height: 58,
    alignItems: 'center',
  },
});

export default HorizontalDatepicker;
