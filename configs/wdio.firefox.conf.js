const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 3,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': {
          args: ['--private'],
        },
      },
    ],
    services: ['geckodriver'],
  },
};
