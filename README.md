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
api.getCities().then(result => {
    // do something with array of
    // Location {
    //    code:number,
    //    city:string, // city name
    //    parent:string, // a region or a capital city
    //    agent: {
    //       code:number,
    //       name:string
    //    }
    // }
});

// calculate a delivery
api.calculate(
    originCityCode, 
    destinationCityCode, 
    weight, 
    cargoCost
).then(result => {
    // do something with 
    // Calculation {
    //    city:string;
    //    parent:string;
    //    cost:number;
    //    insurance:number;
    //    time:number; // delivery time in days
    // }
});
```