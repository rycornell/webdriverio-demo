exports.config = {  
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
  services: ['sauce'],
  maxInstances: 3,
  capabilities: [
    /* Default Configuration - Chrome 1920x1080 */
    {
      maxInstances: 3,
      browserName: 'chrome',
      chromeOptions: {
        args: ['start-maximized']
      },
      screenResolution: '1920x1080',
      build: process.env.SAUCE_BUILD_NAME
    },
    //
    // Additional Configurations below.
    //
    // Responsive Configuration (smaller resolution) - Chrome 1024x768
    {
      maxInstances: 3,
      browserName: 'chrome',
      chromeOptions: {
        args: ['start-maximized']
      },
      screenResolution: '1024x768',
      build: process.env.SAUCE_BUILD_NAME
    },
    // firefox
    {
      maxInstances: 3,
      browserName: 'firefox',
      screenResolution: '1920x1080',
      build: process.env.SAUCE_BUILD_NAME
    },
    // ie
    {
      maxInstances: 3,
      browserName: 'internet explorer',
      screenResolution: '1920x1080',
      build: process.env.SAUCE_BUILD_NAME
    },
    // edge
    {
      maxInstances: 3,
      browserName: 'MicrosoftEdge',
      screenResolution: '1920x1080',
      build: process.env.SAUCE_BUILD_NAME
    }]
};