# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-03

First release since 2020. The package is stable and widely installed, so it
moves to 1.0.0. Four fixes change what renders — see "Migrating from 0.1.x".

### Fixed

- `moment-jalaali` was imported by shipped code but declared only as a
  `devDependency`, so installing the package on its own failed to resolve it.
  It is now a real dependency, along with its types.
- `selectedItemTextStyle` was applied _before_ the built-in text style and so
  was silently overridden. The documented prop now works.
- `getItemLayout` reported `itemHeight` as an item's length on a horizontal
  list, and ignored both the horizontal margins and the wider selected item.
  `scrollToIndex` landed further off the further right you went.
- `endDate` was exclusive, dropping the last day of every range.
- Bounds carrying a time of day shifted the range by a day.
- `createRef` was called inside the function component, allocating a new ref
  on every render. Replaced with `useRef`.
- `initialSelectedDate` was only a `useState` initializer, so later changes to
  the prop were ignored. Changing it now moves the selection.
- Omitting `initialSelectedDate` selected today, via `moment(undefined)`.
  Nothing is selected now.
- `moment.loadPersian()` ran during render, mutating global locale data on
  every pass. It now runs once, and only for `jalali` pickers.
- The day list and `renderItem` were rebuilt on every render.

### Added

- Date props accept a `'YYYY-MM-DD'` string. This is the recommended form:
  `new Date('2020-08-20')` is UTC midnight per the JavaScript spec and lands on
  the previous day west of UTC.
- `onSelectedDateChange` reports a `Date` at local midnight, so `getDate()`
  matches the day that was tapped.
- `itemSpacing` prop for the horizontal margin around each item.
- Accessibility: each day is a button with a full-date label and an
  `accessibilityState.selected` flag.
- A `testID` of `date-YYYY-MM-DD` on each day.
- The list opens scrolled to the selected day rather than to the start.
- `mode` now defaults to `'gregorian'`.

### Changed

- `mode` is optional.
- Entry points corrected; `android`, `ios`, `cpp` and a `.podspec` were listed
  in `files` but never existed in this JS-only package.

### Migrating from 0.1.x

- **`endDate` is now inclusive.** If you added a day to work around the old
  behaviour, remove it.
- **`selectedItemTextStyle` now works.** A `color` or `fontSize` you passed
  years ago and never saw applied will start rendering.
- **Omitting `initialSelectedDate` selects nothing.** Pass
  `initialSelectedDate={new Date()}` to keep the old behaviour.
- **Tapping a day scrolls it to the right place.**

## [0.1.6] - 2020-12-13

Initial published series.

[1.0.0]: https://github.com/AwrminKhodaei/react-native-horizontal-datepicker/compare/v0.1.6...v1.0.0
[0.1.6]: https://github.com/AwrminKhodaei/react-native-horizontal-datepicker/releases/tag/v0.1.6
