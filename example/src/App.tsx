import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HorizontalDatepicker from 'react-native-horizontal-datepicker';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HorizontalDatepicker
        onSelectedDateChange={(date) => console.log(date)}
        mode="gregorian"
        startDate={new Date('2020-08-20')}
        endDate={new Date('2020-08-31')}
        selectedItemTextStyle={{ fontFamily: 'iranyekanmobileFN-medium' }}
        initialSelectedDate={new Date('2020-08-30')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
