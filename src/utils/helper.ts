import moment from 'moment-jalaali'

export const enumerateDaysBetweenDates = (startDate: Date, endDate: Date) => {
  const dateArray = [];
  let currentDate = moment(startDate);
  while (currentDate.isBefore(endDate)) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
};
