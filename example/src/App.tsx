import * as React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import moment from 'moment-jalaali';
import HorizontalDatepicker from 'react-native-horizontal-datepicker';

export default function App() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  return (
    <SafeAreaView style={styles.container}>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date('2020-08-20')}
        endDate={new Date('2020-08-31')}
        initialSelectedDate={new Date('2020-08-22')}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      <Text>{moment(selectedDate).locale('fa').format('jYYYY-jMM-jDD')}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  selectedItemTextStyle: {
    fontFamily:
      Platform.OS === 'android'
        ? 'iranyekanmobile-medium'
        : 'iranyekanmobileFN-medium',
  },
  flatListContainerStyle: {
    display: 'flex',
    alignSelf: 'center',
  },
});
