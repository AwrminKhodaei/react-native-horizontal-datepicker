import moment, { Moment } from 'moment-jalaali';

/**
 * A date accepted by the picker. Prefer the `'YYYY-MM-DD'` string form: a
 * `Date` built from an ISO date string (`new Date('2020-08-20')`) is UTC
 * midnight per the JS spec, so it lands on the previous day west of UTC.
 * `Date` values are read by their *local* calendar day.
 */
export type DateInput = Date | Moment | string;

export const ISO_DAY = 'YYYY-MM-DD';

/** Normalizes any accepted input to a moment, parsing strings as local days. */
export const toMoment = (value: DateInput): Moment =>
  typeof value === 'string' ? moment(value, ISO_DAY) : moment(value);

/** Converts a `'YYYY-MM-DD'` key back to a `Date` at local midnight. */
export const toLocalDate = (day: string): Date => moment(day, ISO_DAY).toDate();

/**
 * Every day from `startDate` to `endDate` inclusive, as `'YYYY-MM-DD'` keys.
 * Time of day on either bound is ignored.
 */
export const enumerateDaysBetweenDates = (
  startDate: DateInput,
  endDate: DateInput
): string[] => {
  const current = toMoment(startDate).startOf('day');
  const end = toMoment(endDate).startOf('day');
  const days: string[] = [];
  while (current.isSameOrBefore(end, 'day')) {
    days.push(current.format(ISO_DAY));
    current.add(1, 'day');
  }
  return days;
};
