import * as React from 'react';
import { render, screen } from '@testing-library/react-native';
import HorizontalDatepicker from '../index';

it.each(['gregorian', 'jalali'] as const)(
  'selects the first day of the range in %s mode',
  async (mode) => {
    await render(
      <HorizontalDatepicker
        mode={mode}
        startDate="2020-08-20"
        endDate="2020-08-31"
        initialSelectedDate="2020-08-20"
        onSelectedDateChange={() => {}}
      />
    );
    expect(
      screen.getByTestId('date-2020-08-20').props.accessibilityState.selected
    ).toBe(true);
  }
);
