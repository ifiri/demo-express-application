# Demo Express Application
Simple demo application written in Express &amp; Sequelize.

## Prepare project
1. Configure local Postgres server.
2. Rename `.env.example` to `.env` and replace database credentials to your ones.
3. Do NOT create DB manually! Instead, run `yarn run prepare:db` to create database, migrate & seed.
4. Run `yarn run start` to run server

## Test project
For load testing purposes I use Autocannon. It's included in this package. Use `yarn run test:db` to run load test, or use your own.

## Notes
Endpoint has following format `http://localhost:{port}/users/{userId}/balance`, where `method` is `POST` and `amount` should be passed in `body`.
