import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import HorizontalDatepicker from 'react-native-horizontal-datepicker';

export default function App() {
  return (
    <View style={styles.container}>
      <HorizontalDatepicker onSelectedDateChange={(date) => console.log(date)} mode='gregorian' startDate={new Date('2020-08-20')} endDate={new Date('2020-08-30')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
