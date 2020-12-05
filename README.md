# react-native-horizontal-datepicker

horizontal datepicker for react-native

## Installation

```sh
npm install react-native-horizontal-datepicker
```

## Usage

```js
import HorizontalDatepicker from 'react-native-horizontal-datepicker';

// ...

<HorizontalDatepicker
  onSelectedDateChange={(date) => console.log(date)}
  mode="gregorian"
  startDate={new Date('2020-08-20')}
  endDate={new Date('2020-08-31')}
  selectedItemTextStyle={{ fontFamily: 'iranyekanmobileFN-medium' }}
  initialSelectedDate={new Date('2020-08-30')}
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
