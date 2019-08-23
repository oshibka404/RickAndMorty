# Rick and Morty characters
It's a React Native application displaying the list of characters of Rick and Morty TV show. Built upon Expo framework with TypeScript, it uses data from [Rick and Morty API](http://rickandmortyapi.com) created by [afuh](https://github.com/afuh).

## Run
`npm ci && npm start` or `expo start`

### Prerequisites
Node 10+

Expo.io toolkit installed

## Code structure
Source code of the app can be found in [`src`](../master/src) folder.

Data fetching mechanics are isolated in [`src/fetch`](../master/src/fetch), while components along with snapshot tests are located in [`src/components`](../master/src/components).

The root folder contains configuration files for development tools: Babel, Jest, Watchman, Typescript.

## Unit tests
`npm run test` to run all exisiting suites

API response mock is in [`src/__mocks__`](../master/src/__mocks__) folder. Snapshots are in [`src/__snapshots__`](../master/src/__snapshots__) and [`src/components/__snapshots__`](../master/src/components/__snapshots__).

Global `fetch()` method is mocked with [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock) package.

The test suites can be found right after each module named as `%MODULE_NAME%.test.ts` or `-.tsx`.
