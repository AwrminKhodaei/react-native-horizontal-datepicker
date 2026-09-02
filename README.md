# react-native-horizontal-datepicker

Jalali and gregorian react native horizontal datepicker 🔥

  <p align='center'>
<img src="https://i.ibb.co/7Yh2GSP/package.png" alt="@awrminkhodaei/react-native-horizontal-datepicker" style="max-width: 100%;"/>
</p>

![React native horizontal date picker - Animated gif demo](example/demo.gif)

## Installation

```sh

npm install @awrminkhodaei/react-native-horizontal-datepicker

or

yarn add @awrminkhodaei/react-native-horizontal-datepicker

```

There is nothing else to install — `moment-jalaali` now ships as a dependency
of this package. Before v1 you had to add it to your own app by hand.

## Usage

```js
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';

// ...

<HorizontalDatepicker
  mode="gregorian"
  startDate="2020-08-20"
  endDate="2020-08-31"
  initialSelectedDate="2020-08-22"
  onSelectedDateChange={(date) => setSelectedDate(date)}
  selectedItemWidth={170}
  unselectedItemWidth={38}
  itemHeight={38}
  itemRadius={10}
  selectedItemTextStyle={styles.selectedItemTextStyle}
  unselectedItemTextStyle={styles.unselectedItemTextStyle}
  selectedItemBackgroundColor="#222831"
  unselectedItemBackgroundColor="#ececec"
  flatListContainerStyle={styles.flatListContainerStyle}
/>;
```

### Dates and time zones

Every date prop accepts a `'YYYY-MM-DD'` string, a `Date`, or a moment.

Prefer the string form. `new Date('2020-08-20')` is **UTC** midnight by the
JavaScript spec, so anywhere west of UTC it is really the evening of the 19th
and the picker will start a day early. A `Date` is read by its local calendar
day, so `new Date(2020, 7, 20)` is also unambiguous.

`onSelectedDateChange` hands you a `Date` at local midnight, so
`date.getDate()` always matches the day that was tapped.

## Props

| Prop                            | Type                       | Default       | Description                                             |
| ------------------------------- | -------------------------- | ------------- | ------------------------------------------------------- |
| `mode`                          | `'gregorian' \| 'jalali'`  | `'gregorian'` | Calendar system used for labels                         |
| `startDate`                     | `string \| Date \| Moment` | —             | First day of the range, **inclusive**                   |
| `endDate`                       | `string \| Date \| Moment` | —             | Last day of the range, **inclusive**                    |
| `onSelectedDateChange`          | `(date: Date) => void`     | —             | Called with the tapped day at local midnight            |
| `initialSelectedDate`           | `string \| Date \| Moment` | none          | Day to select on mount; changing it moves the selection |
| `selectedItemWidth`             | `number`                   | `170`         | Width of the selected item                              |
| `unselectedItemWidth`           | `number`                   | `38`          | Width of the other items                                |
| `itemHeight`                    | `number`                   | `38`          | Height of every item                                    |
| `itemRadius`                    | `number`                   | `10`          | Corner radius of every item                             |
| `itemSpacing`                   | `number`                   | `10`          | Horizontal margin on each side of every item            |
| `selectedItemTextStyle`         | `TextStyle`                | —             | Text style of the selected item                         |
| `unselectedItemTextStyle`       | `TextStyle`                | —             | Text style of the other items                           |
| `selectedItemBackgroundColor`   | `string`                   | `#16213e`     | Background of the selected item                         |
| `unselectedItemBackgroundColor` | `string`                   | `#fff`        | Background of the other items                           |
| `flatListContainerStyle`        | `ViewStyle`                | —             | `contentContainerStyle` of the underlying `FlatList`    |

Each day is exposed to screen readers as a button labelled with its full date,
and carries an `accessibilityState.selected` flag. Each day also has a
`testID` of `date-YYYY-MM-DD` so you can target it from your own tests.

## Upgrading to v1

v1 is a bug-fix release, but four fixes change what you see on screen:

- **`endDate` is now inclusive.** It used to be dropped. If you were adding a
  day to work around that, remove it.
- **`selectedItemTextStyle` now works.** It was previously overridden by the
  built-in style, so a picker that looked right may now pick up a `color` or
  `fontSize` you passed years ago and never saw applied.
- **Omitting `initialSelectedDate` now selects nothing.** It used to select
  today. Pass `initialSelectedDate={new Date()}` to keep the old behaviour.
- **Tapping a day scrolls it to the right place.** The old measurement
  reported an item's height as its width and ignored margins.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
