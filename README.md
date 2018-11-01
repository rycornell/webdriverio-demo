# webdriverio-demo

This is a sample WebdriverIO project.

It automatically retries failed tests and generates a custom .conf file for each test run based on command line arguments.

The retry logic is inspired by [Protractor Flake](https://github.com/NickTomlin/protractor-flake)

It also contains some basic helper functions to avoid timeouts and waits.

To run the project:

`npm install`
`npm run e2e`

It supports local, dev and production configurations.  To run for a specific environment:

`npm run e2e-dev`
`npm run e2e-prod`

It supports Sauce Labs and headless configurations.  For Sauce Labs, you must set the environment variables for your Sauce user and key.

`npm run e2e -- --sauce`
`npm run e2e -- --headless`

Pass standard WebdriverIO command line parameters:

`npm run e2e -- --spec ./specs/login.spec.ts`