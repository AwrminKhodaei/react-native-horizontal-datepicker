import moment, { Moment } from 'moment-jalaali';

export const enumerateDaysBetweenDates = (
  startDate: Date | Moment,
  endDate: Date | Moment
) => {
  const dateArray = [];
  let currentDate = moment(startDate);
  while (currentDate.isBefore(endDate)) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};
