# majorexpress

NodeJS API for MajorExpress Web Services

## Install

```
npm install --save majorexpress
```

## Usage

```js
var MajorExpress = require('majorexpress');
var api = new MajorExpress('username', 'password');

// get cities
api.getCities().then((result) => {
    // do something
});

// calculate a delivery
api.calculate(originCityCode, destinationCityCode, weight, cargoCost).then((result) => {
    // do something
});
```