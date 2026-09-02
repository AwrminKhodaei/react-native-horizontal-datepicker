import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import moment from 'moment-jalaali';
import SelectedDate from './components/Selected';
import UnSelectedDate from './components/UnSelected';
import {
  DateInput,
  ISO_DAY,
  enumerateDaysBetweenDates,
  toLocalDate,
  toMoment,
} from './utils/helper';
import { createGetItemLayout } from './utils/layout';

export type DatepickerMode = 'gregorian' | 'jalali';

export interface HorizontalDatepickerProps {
  /** Calendar system used for labels. Defaults to `'gregorian'`. */
  mode?: DatepickerMode;
  /** First day of the range, inclusive. */
  startDate: DateInput;
  /** Last day of the range, inclusive. */
  endDate: DateInput;
  /** Called with the tapped day as a `Date` at local midnight. */
  onSelectedDateChange: (date: Date) => void;
  /** Day to select on mount; changing it moves the selection. */
  initialSelectedDate?: DateInput;
  selectedItemWidth?: number;
  unselectedItemWidth?: number;
  itemHeight?: number;
  itemRadius?: number;
  /** Horizontal margin on each side of every item. Defaults to 10. */
  itemSpacing?: number;
  selectedItemTextStyle?: TextStyle;
  unselectedItemTextStyle?: TextStyle;
  selectedItemBackgroundColor?: string;
  unselectedItemBackgroundColor?: string;
  flatListContainerStyle?: ViewStyle;
}

// Label formats: full date on the selected item, day number on the rest.
const FORMATS = {
  jalali: { long: 'dddd، jD jMMMM', short: 'jD', locale: 'fa' },
  gregorian: { long: 'dddd, MMM D', short: 'DD', locale: 'en' },
} as const;

// `loadPersian` mutates moment's global locale data, so do it once, and only
// once a jalali picker is actually rendered.
let persianLoaded = false;
const ensurePersian = () => {
  if (!persianLoaded) {
    moment.loadPersian({ dialect: 'persian-modern' });
    persianLoaded = true;
  }
};

const toKey = (value?: DateInput): string | null =>
  value == null ? null : toMoment(value).format(ISO_DAY);

const HorizontalDatepicker: React.FC<HorizontalDatepickerProps> = ({
  mode = 'gregorian',
  startDate,
  endDate,
  onSelectedDateChange,
  initialSelectedDate,
  selectedItemWidth = 170,
  unselectedItemWidth = 38,
  itemHeight = 38,
  itemRadius = 10,
  itemSpacing = 10,
  selectedItemTextStyle,
  unselectedItemTextStyle,
  selectedItemBackgroundColor,
  unselectedItemBackgroundColor,
  flatListContainerStyle,
}) => {
  if (mode === 'jalali') {
    ensurePersian();
  }

  const initialKey = toKey(initialSelectedDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(initialKey);
  // Track the prop so a change to it moves the selection, without making the
  // component fully controlled.
  const [appliedKey, setAppliedKey] = useState<string | null>(initialKey);
  if (initialKey !== appliedKey) {
    setAppliedKey(initialKey);
    setSelectedDate(initialKey);
  }

  const listRef = useRef<FlatList<string>>(null);

  const days = useMemo(() => enumerateDaysBetweenDates(startDate, endDate), [
    startDate,
    endDate,
  ]);

  const selectedIndex = selectedDate ? days.indexOf(selectedDate) : -1;

  const getItemLayout = useMemo(
    () =>
      createGetItemLayout({
        selectedIndex,
        selectedItemWidth,
        unselectedItemWidth,
        itemSpacing,
      }),
    [selectedIndex, selectedItemWidth, unselectedItemWidth, itemSpacing]
  );

  const onDateItemPress = useCallback(
    (day: string, index: number) => {
      setSelectedDate(day);
      onSelectedDateChange(toLocalDate(day));
      listRef.current?.scrollToIndex({
        animated: true,
        index,
        viewPosition: 0.5,
      });
    },
    [onSelectedDateChange]
  );

  const format = FORMATS[mode];

  const renderItem = useCallback<ListRenderItem<string>>(
    ({ item, index }) => {
      const label = moment(item, ISO_DAY).locale(format.locale);
      const isSelected = item === selectedDate;
      return (
        <TouchableOpacity
          testID={`date-${item}`}
          accessibilityRole="button"
          accessibilityLabel={label.format(format.long)}
          accessibilityState={{ selected: isSelected }}
          onPress={() => onDateItemPress(item, index)}
        >
          {isSelected ? (
            <SelectedDate
              text={label.format(format.long)}
              selectedItemWidth={selectedItemWidth}
              selectedItemTextStyle={selectedItemTextStyle}
              selectedItemBackgroundColor={selectedItemBackgroundColor}
              itemRadius={itemRadius}
              itemHeight={itemHeight}
              itemSpacing={itemSpacing}
            />
          ) : (
            <UnSelectedDate
              text={label.format(format.short)}
              unselectedItemWidth={unselectedItemWidth}
              unselectedItemTextStyle={unselectedItemTextStyle}
              unselectedItemBackgroundColor={unselectedItemBackgroundColor}
              itemRadius={itemRadius}
              itemHeight={itemHeight}
              itemSpacing={itemSpacing}
            />
          )}
        </TouchableOpacity>
      );
    },
    [
      format,
      selectedDate,
      onDateItemPress,
      selectedItemWidth,
      selectedItemTextStyle,
      selectedItemBackgroundColor,
      unselectedItemWidth,
      unselectedItemTextStyle,
      unselectedItemBackgroundColor,
      itemRadius,
      itemHeight,
      itemSpacing,
    ]
  );

  return (
    <FlatList
      ref={listRef}
      horizontal
      inverted={mode === 'jalali'}
      showsHorizontalScrollIndicator={false}
      data={days}
      extraData={selectedDate}
      keyExtractor={(day) => day}
      renderItem={renderItem}
      getItemLayout={(_, index) => getItemLayout(index)}
      initialScrollIndex={selectedIndex > 0 ? selectedIndex : 0}
      // Widths change as the selection moves; recover instead of throwing.
      onScrollToIndexFailed={({ index }) => {
        listRef.current?.scrollToOffset({
          offset: getItemLayout(index).offset,
          animated: true,
        });
      }}
      contentContainerStyle={[styles.container, flatListContainerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height: 58,
    alignItems: 'center',
  },
});

export default HorizontalDatepicker;
