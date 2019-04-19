# Cleanly 

An app that uses health inspection data to rate the cleanliness of restaurants around San Francisco.

Live site: https://murmuring-tor-26400.herokuapp.com/

## My Contributions
Components (React)
- https://github.com/skmanik/cleanly/tree/master/client/src/components/Card
- https://github.com/skmanik/cleanly/tree/master/client/src/components/Carousel
- https://github.com/skmanik/cleanly/tree/master/client/src/components/Details
- https://github.com/skmanik/cleanly/tree/master/client/src/components/Search

Pages (React)
- https://github.com/skmanik/cleanly/blob/master/client/src/pages/Detail/Detail.js
- https://github.com/skmanik/cleanly/tree/master/client/src/pages/Results
- https://github.com/skmanik/cleanly/tree/master/client/src/pages/Home

Server-side (Node)
- https://github.com/skmanik/cleanly/blob/master/routes/api/facilities.js
- https://github.com/skmanik/cleanly/blob/master/controllers/facilitiesController.js

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
