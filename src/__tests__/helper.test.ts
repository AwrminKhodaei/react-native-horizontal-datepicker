import moment from 'moment-jalaali';
import { enumerateDaysBetweenDates } from '../utils/helper';

describe('enumerateDaysBetweenDates', () => {
  it('includes the end date', () => {
    expect(enumerateDaysBetweenDates('2020-08-20', '2020-08-23')).toEqual([
      '2020-08-20',
      '2020-08-21',
      '2020-08-22',
      '2020-08-23',
    ]);
  });

  it('returns a single day when start and end are the same', () => {
    expect(enumerateDaysBetweenDates('2020-08-20', '2020-08-20')).toEqual([
      '2020-08-20',
    ]);
  });

  it('returns an empty range when end precedes start', () => {
    expect(enumerateDaysBetweenDates('2020-08-23', '2020-08-20')).toEqual([]);
  });

  it('is not shifted by the time of day on the bounds', () => {
    const start = new Date(2020, 7, 20, 23, 30);
    const end = new Date(2020, 7, 22, 1, 15);
    expect(enumerateDaysBetweenDates(start, end)).toEqual([
      '2020-08-20',
      '2020-08-21',
      '2020-08-22',
    ]);
  });

  it('reads a Date by its local calendar day', () => {
    const start = new Date(2020, 7, 20);
    expect(enumerateDaysBetweenDates(start, start)).toEqual(['2020-08-20']);
  });

  it('accepts moment objects', () => {
    const start = moment('2020-08-20', 'YYYY-MM-DD');
    const end = moment('2020-08-21', 'YYYY-MM-DD');
    expect(enumerateDaysBetweenDates(start, end)).toEqual([
      '2020-08-20',
      '2020-08-21',
    ]);
  });
});
