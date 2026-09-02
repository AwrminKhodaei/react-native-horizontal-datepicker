import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import renderer, { ReactTestInstance, act } from 'react-test-renderer';
import moment from 'moment-jalaali';
import HorizontalDatepicker from '../index';

const range = { startDate: '2020-08-20', endDate: '2020-08-24' };

const render = (
  props: Partial<React.ComponentProps<typeof HorizontalDatepicker>> = {}
) =>
  renderer.create(
    <HorizontalDatepicker
      mode="gregorian"
      onSelectedDateChange={() => {}}
      {...range}
      {...props}
    />
  );

const dayCell = (
  tree: renderer.ReactTestRenderer,
  day: string
): ReactTestInstance => tree.root.findByProps({ testID: `date-${day}` });

const textOf = (cell: ReactTestInstance): ReactTestInstance =>
  cell.findByType(Text);

describe('HorizontalDatepicker', () => {
  it('renders one cell per day in the inclusive range', () => {
    const tree = render();
    expect(tree.root.findAllByType(TouchableOpacity)).toHaveLength(5);
    expect(dayCell(tree, '2020-08-24')).toBeTruthy();
  });

  it('selects nothing when no initial date is given, even around today', () => {
    const today = moment().startOf('day');
    const tree = render({
      startDate: today.clone().subtract(2, 'days').format('YYYY-MM-DD'),
      endDate: today.clone().add(2, 'days').format('YYYY-MM-DD'),
    });
    const states = tree.root
      .findAllByType(TouchableOpacity)
      .map((cell) => cell.props.accessibilityState.selected);
    expect(states).toEqual([false, false, false, false, false]);
  });

  it('lets selectedItemTextStyle override the built-in text style', () => {
    const tree = render({
      initialSelectedDate: '2020-08-22',
      selectedItemTextStyle: { color: 'rebeccapurple', fontSize: 22 },
    });
    const style = StyleSheet.flatten(
      textOf(dayCell(tree, '2020-08-22')).props.style
    );
    expect(style.color).toBe('rebeccapurple');
    expect(style.fontSize).toBe(22);
  });

  it('lets unselectedItemTextStyle override the built-in text style', () => {
    const tree = render({
      initialSelectedDate: '2020-08-22',
      unselectedItemTextStyle: { color: 'tomato' },
    });
    const style = StyleSheet.flatten(
      textOf(dayCell(tree, '2020-08-21')).props.style
    );
    expect(style.color).toBe('tomato');
  });

  it('reports the tapped day as a local-midnight Date', () => {
    const onSelectedDateChange = jest.fn();
    const tree = render({ onSelectedDateChange });
    act(() => {
      dayCell(tree, '2020-08-22').props.onPress();
    });
    const date: Date = onSelectedDateChange.mock.calls[0][0];
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([
      2020,
      7,
      22,
    ]);
    expect(date.getHours()).toBe(0);
  });

  it('moves the selection to the tapped day', () => {
    const tree = render({ initialSelectedDate: '2020-08-20' });
    act(() => {
      dayCell(tree, '2020-08-23').props.onPress();
    });
    expect(dayCell(tree, '2020-08-23').props.accessibilityState.selected).toBe(
      true
    );
    expect(dayCell(tree, '2020-08-20').props.accessibilityState.selected).toBe(
      false
    );
  });

  it('follows initialSelectedDate when the prop changes', () => {
    const tree = render({ initialSelectedDate: '2020-08-20' });
    act(() => {
      tree.update(
        <HorizontalDatepicker
          mode="gregorian"
          onSelectedDateChange={() => {}}
          {...range}
          initialSelectedDate="2020-08-23"
        />
      );
    });
    expect(dayCell(tree, '2020-08-23').props.accessibilityState.selected).toBe(
      true
    );
  });

  it('exposes each day as a button with a readable label', () => {
    const tree = render({ initialSelectedDate: '2020-08-22' });
    const cell = dayCell(tree, '2020-08-22');
    expect(cell.props.accessibilityRole).toBe('button');
    expect(cell.props.accessibilityLabel).toBe('Saturday, Aug 22');
  });

  it('opens scrolled to the initially selected day', () => {
    const tree = render({ initialSelectedDate: '2020-08-23' });
    expect(tree.root.findByType(FlatList).props.initialScrollIndex).toBe(3);
  });

  it('renders Persian month names in jalali mode', () => {
    const tree = render({ mode: 'jalali', initialSelectedDate: '2020-08-22' });
    expect(textOf(dayCell(tree, '2020-08-22')).props.children).toContain(
      'شهریور'
    );
  });
});
