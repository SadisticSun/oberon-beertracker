# BeerTracker - Vind speciaalbier brouwerijen bij jou in de buurt!

## About
### Repository
This app is made for the intake assignment provided to me by Oberon.
### App
BeerTracker lets you search a predefined breweries dataset for the brewery closest to you, based on the zipcode you provide or your GPS location.

## Installation
1. Generate a Google Maps API key at [Google Cloud Platform](https://cloud.google.com/maps-platform/) or use your own
2. As always, clone this repository.
3. run `npm install` or `yarn``to install the needed dependencies.
4. Create a `.env` file at the root of the project folder with the following variable:
  * REACT_APP_GEOLOCATION_API_KEY=**YOUR API KEY**
5. Start the app with `npm run start` or `yarn start`.
6. App opens in default browser on `localhost:3000`

**!!! WARNING: this app uses the Google Maps API's which do not allow Cross-Origin requests! To remedy this, either deploy this app onto a domain or use [this Google Chrome extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) to temporarily allow CORS-requests.**

## Features
1. Search for the closest brewery to the zipcode you provide.
2. Use your GPS location to find the closest brewery.

## Tech
This app is made with love, and:
1. [ReactJS v16+](https://reactjs.org/), using [`create-react-app`](https://github.com/facebook/create-react-app)
2. [React Router v4](https://github.com/ReactTraining/react-router)
3. [Redux/React-Redux](https://redux.js.org/)
4. [BloomerJS](https://bloomer.js.org/#/), [BulmaCSS](https://bulma.io/)-components for React.
5. Google Maps API.
