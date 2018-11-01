exports.config = {  
  capabilities: [
    {
      maxInstances: 3,
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless', '--window-size=1920,1080']
      },
      screenResolution: '1920x1080'
    }],
};