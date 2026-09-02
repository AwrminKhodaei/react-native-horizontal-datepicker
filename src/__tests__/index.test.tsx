import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react-native';
import moment from 'moment-jalaali';
import HorizontalDatepicker from '../index';

const range = { startDate: '2020-08-20', endDate: '2020-08-24' };

type Props = React.ComponentProps<typeof HorizontalDatepicker>;
type Cell = ReturnType<typeof screen.getByTestId>;

const renderPicker = (props: Partial<Props> = {}) =>
  render(
    <HorizontalDatepicker
      mode="gregorian"
      onSelectedDateChange={() => {}}
      {...range}
      {...props}
    />
  );

const dayCell = (day: string) => screen.getByTestId(`date-${day}`);

// Each cell holds exactly one Text node.
const textStyleOf = (cell: Cell) =>
  StyleSheet.flatten(within(cell).getByText(/.+/).props.style);

describe('HorizontalDatepicker', () => {
  it('renders one cell per day in the inclusive range', async () => {
    await renderPicker();
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(dayCell('2020-08-24')).toBeTruthy();
  });

  it('selects nothing when no initial date is given, even around today', async () => {
    const today = moment().startOf('day');
    await renderPicker({
      startDate: today.clone().subtract(2, 'days').format('YYYY-MM-DD'),
      endDate: today.clone().add(2, 'days').format('YYYY-MM-DD'),
    });
    const states = screen
      .getAllByRole('button')
      .map((cell) => cell.props.accessibilityState.selected);
    expect(states).toEqual([false, false, false, false, false]);
  });

  it('lets selectedItemTextStyle override the built-in text style', async () => {
    await renderPicker({
      initialSelectedDate: '2020-08-22',
      selectedItemTextStyle: { color: 'rebeccapurple', fontSize: 22 },
    });
    const style = textStyleOf(dayCell('2020-08-22'));
    expect(style.color).toBe('rebeccapurple');
    expect(style.fontSize).toBe(22);
  });

  it('lets unselectedItemTextStyle override the built-in text style', async () => {
    await renderPicker({
      initialSelectedDate: '2020-08-22',
      unselectedItemTextStyle: { color: 'tomato' },
    });
    // Days before the selection are outside the initial render window.
    expect(textStyleOf(dayCell('2020-08-23')).color).toBe('tomato');
  });

  it('reports the tapped day as a local-midnight Date', async () => {
    const onSelectedDateChange = jest.fn();
    await renderPicker({ onSelectedDateChange });

    await fireEvent.press(dayCell('2020-08-22'));

    const date: Date = onSelectedDateChange.mock.calls[0][0];
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([
      2020, 7, 22,
    ]);
    expect(date.getHours()).toBe(0);
  });

  it('moves the selection to the tapped day', async () => {
    await renderPicker({ initialSelectedDate: '2020-08-20' });

    await fireEvent.press(dayCell('2020-08-23'));

    expect(dayCell('2020-08-23').props.accessibilityState.selected).toBe(true);
    expect(dayCell('2020-08-20').props.accessibilityState.selected).toBe(false);
  });

  it('keeps scrolling to the tapped day on repeated presses', async () => {
    const scrollToIndex = jest.spyOn(FlatList.prototype, 'scrollToIndex');
    await renderPicker({ initialSelectedDate: '2020-08-20' });

    await fireEvent.press(dayCell('2020-08-22'));
    await fireEvent.press(dayCell('2020-08-23'));

    expect(scrollToIndex).toHaveBeenCalledTimes(2);
    expect(scrollToIndex.mock.calls[1][0]).toMatchObject({ index: 3 });
    scrollToIndex.mockRestore();
  });

  it('follows initialSelectedDate when the prop changes', async () => {
    await renderPicker({ initialSelectedDate: '2020-08-20' });

    await screen.rerender(
      <HorizontalDatepicker
        mode="gregorian"
        onSelectedDateChange={() => {}}
        {...range}
        initialSelectedDate="2020-08-23"
      />
    );

    expect(dayCell('2020-08-23').props.accessibilityState.selected).toBe(true);
  });

  it('exposes each day as a button with a readable label', async () => {
    await renderPicker({ initialSelectedDate: '2020-08-22' });
    const cell = dayCell('2020-08-22');
    expect(cell.props.accessibilityRole).toBe('button');
    expect(cell.props.accessibilityLabel).toBe('Saturday, Aug 22');
  });

  it('opens with the initially selected day already in the window', async () => {
    await renderPicker({ initialSelectedDate: '2020-08-23' });
    // The list opens at the selection rather than at the start of the range,
    // so earlier days are not mounted yet.
    expect(screen.getByTestId('date-2020-08-23')).toBeTruthy();
    expect(screen.queryByTestId('date-2020-08-20')).toBeNull();
  });

  it('renders Persian month names in jalali mode', async () => {
    await renderPicker({ mode: 'jalali', initialSelectedDate: '2020-08-22' });
    expect(within(dayCell('2020-08-22')).getByText(/شهریور/)).toBeTruthy();
  });
});
