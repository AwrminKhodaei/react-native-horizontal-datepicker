import * as React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import moment from 'moment-jalaali';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';

export default function App() {
  const [jalaliDate, setJalaliDate] = React.useState<Date>();
  const [gregorianDate, setGregorianDate] = React.useState<Date>();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <HorizontalDatepicker
          mode="jalali"
          startDate="2020-08-20"
          endDate="2020-08-31"
          initialSelectedDate="2020-08-20"
          onSelectedDateChange={(date) => setJalaliDate(date)}
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
        <Text>{moment(jalaliDate).locale('fa').format('jYYYY-jMM-jDD')}</Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate="2020-08-20"
          endDate="2020-08-31"
          initialSelectedDate="2020-08-20"
          onSelectedDateChange={(date) => setGregorianDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
        <Text>{moment(gregorianDate).locale('en').format('YYYY-MM-DD')}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
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
    alignSelf: 'center',
  },
});
