exports.config = {
  baseUrl: 'https://accounts.google.com/',
  specs: ['./**/*.spec.ts'],
  exclude: [],
  suites: {
    login: ['./**/login.spec.ts'],
    registration: ['./**/registration.spec.ts']
  },
  maxInstances: 3,
  capabilities: [
    /* Default Configuration - Chrome 1920x1080 */
    {
      maxInstances: 3,
      browserName: 'chrome',
      chromeOptions: {
        args: ['start-maximized']
      },
      screenResolution: '1920x1080'
    }],
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  waitforTimeout: 30000,
  connectionRetryCount: 3,
  bail: 0,
  services: ['selenium-standalone'],
  framework: 'jasmine',
  reporters: ['spec', 'junit'],
  reporterOptions: {
    junit: {
        outputDir: './testresults'
    }
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  before: function() {
    require('ts-node/register');
  },
  afterSession: async function() {
    // workaround to make sure the chromedriver shuts down
    await browser.end().pause(1000);
  },
  after: async function() {
    // workaround to make sure the chromedriver shuts down
    await browser.pause(1000);
  },
  testData: {
    user: {
      username: 'user@user.test',
      password: 'password'
    }
  }
};