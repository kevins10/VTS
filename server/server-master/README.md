### Server-side for CMPT 372 Term Project!

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

To view all available endpoints, visit http://localhost:3000/api.

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Utility

```bash
# Generate a new service
$ nest g service [service_name]

# Generate a new resource
$ nest g res [resource_name]
```

# Prisma

#### Initialization

```bash
# install
$ npm install prisma --save-dev

# generate migration (name migrations accordingly)
$ npx prisma migrate dev

# seed the database with dummy data
$ npx prisma db seed
```

#### Utility

```bash
# Studio
$ npx prisma studio

```
