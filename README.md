# react-native-horizontal-datepicker

Jalali and gregorian react native horizontal datepicker 🔥

  <p align='center'>
<img src="https://i.ibb.co/7Yh2GSP/package.png" alt="@awrminkhodaei/react-native-horizontal-datepicker" style="max-width: 100%;"/>
</p>

 <p align="center" >
<p align="center" >
   <a href="https://www.npmjs.com/package/@awrminkhodaei/react-native-horizontal-datepicker">
    <img alt="@awrminkhodaei/react-native-horizontal-datepicker" src="https://i.ibb.co/4dhYwBm/photo5938425253686522698.jpg" width="260" height="auto" />
 </a>
</p>

## Installation

```sh

npm install @awrminkhodaei/react-native-horizontal-datepicker

or

yarn add @awrminkhodaei/react-native-horizontal-datepicker

```

## Usage

```js
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';

// ...

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
/>;
```

## Props

- `mode` (String) : defines datepickers mode, `jalali | gregorian`
- `startDate` (Date): starting date of picker, ex: `startDate= new Date('2020-12-01')`
- `endDate` (Date): ending date of picker, ex: `endDate= new Date('2020-12-10')`
- `onSelectedDateChange` (Function): callback when pressing an item on picker with `selectedDate` value
- `initialSelectedDate` (Date): sets default selected item on picker
- `selectedItemWidth` (Number): width of selected item on picker defaults to 170
- `unselectedItemWidth` (Number): width of unselected item on picker defaults to 38
- `itemHeight` (Number): sets all items height on picker defaults to 38
- `itemRadius` (Number): sets all items radius on picker defaults to 10
- `selectedItemTextStyle` (TextStyle): selected items text style, ex: `selectedItemTextStyle={{fontFamily: 'nunito'}}`
- `unselectedItemTextStyle` (TextStyle): unselected items text style, ex: `selectedItemTextStyle={{fontFamily: 'nunito'}}`
- `selectedItemBackgroundColor` (String): sets selected items background color, defaults to `#16213e`
- `unselectedItemBackgroundColor` (String): sets unselected items background color, defaults to `#fff`
- `flatListContainerStyle` (ViewStyle): sets `contentContainerStlye` of FlatList containg date items

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
