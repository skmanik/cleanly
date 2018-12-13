# cleanly 

An app that uses health inspection data to rate the cleanliness of restaurants around San Francisco.

Live site: https://murmuring-tor-26400.herokuapp.com/

## Implementation

* DataSF's SODA API to retrieve restaurant health inspection data and Yelp API to retrieve restaurant photos
* Mongo database for storing users' comments on restaurants
* React.js for UI components

## Running

```bash
$ cd cleanly
$ npm install
$ npm start
```

## Data Sets & Dependencies

* [DataSF Restaurant Scores API](https://dev.socrata.com/foundry/data.sfgov.org/sipz-fjte)
* [Yelp API](https://www.yelp.com/developers/documentation/v3)
* [React.js](https://reactjs.org/)
* [Mongoose](https://mongoosejs.com/)
* [query-string](https://www.npmjs.com/package/query-string)
* [react-paginate](https://www.npmjs.com/package/react-paginate)
* [react-svg-bar-chart](https://www.npmjs.com/package/react-svg-bar-chart)
* [react-simple-tooltip](https://www.npmjs.com/package/react-simple-tooltip)
