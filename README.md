# December Labs - ORT - UXQUEST API - 2020/21

# Setup

## Create `.env` file

Add corresponding config values

# Running with docker

To run the project simply run

### `docker-compose up`

This will spin up the `ort-uxquest-api` instance.\
To spin up the instance with a new build add the `--build` flag as so

### `docker-compose up --build`

Go to `http://localhost:{{PORT}}/` and you should see the project up and running

# Running local

## Installation

```bash
$ npm install
$ npm run migration run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```