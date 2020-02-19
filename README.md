# pick-util [![Build Status](https://travis-ci.com/jonkemp/pick-util.svg?branch=master)](https://travis-ci.com/jonkemp/pick-util)

> Return a copy of the object only containing the whitelisted properties.

Inspired by `_.pick`. 😄


## Install

Install with [npm](https://npmjs.org/package/pick-util)

```
$ npm install pick-util
```

Or [unpkg](https://unpkg.com/pick-util/)

```
<script src="https://unpkg.com/pick-util@1.0.0/umd/index.js" />
```

Check out the unit tests on [CodePen](https://codepen.io/jonkemp/full/OJVXabQ).

## Usage

```js
const pluck = require('pick-util');

pick({ 'a': 1, 'b': '2', 'c': 3 }, 'a', 'c');
//=> { 'a': 1, 'c': 3 }

pick({ 'user': 'barney',  'age': 36, 'active': true }, ['user', 'active']);
//=> { 'user': 'barney', 'active': true }
```

---
| **Like us a lot?** Help others know why you like us! **Review this package on [pkgreview.dev](https://pkgreview.dev/npm/pick-util)** | ➡   | [![Review us on pkgreview.dev](https://i.ibb.co/McjVMfb/pkgreview-dev.jpg)](https://pkgreview.dev/npm/pick-util) |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------------------------------------- |

## API

### pick(object, *keys)

#### object

Type: `object`  
Default: `none`

The object to filter.

#### keys

Type: `array` or comma separated list of `string` values  
Default: `none`

Keys for the picked properties.

## License

MIT
