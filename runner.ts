/*
 * WDIO Test Runner
 * This runner will execute webdriver.io tests, parse the output and retry failed tests.
 * */

function runner() {
  const fs = require('fs-extra');
  const maxRetries = 2;
  const confFile = `${new Date().getTime()}.conf.js`;
  let attempts = 0;
  let wdioCommand = `wdio ${confFile} ${process.argv.slice(2).join(' ')}`;

  deleteTestResults();
  runWdio();

  function runWdio(specs: String[] = []) {
    let output = '';
    attempts++;
    buildConfFile();

    if (specs && specs.length > 0) {
      wdioCommand += ' --spec ' + specs.join(',');
      log('Running Specs: ' + specs.join('\n'));
    }

    const child = require('child_process').spawn(wdioCommand, [], {
      shell: true
    });

    child.stdout.on('data', function(data) {
      const text = data.toString();
      console.log(text);
      output += text;
    });

    child.stderr.on('data', function(data) {
      const text = data.toString();
      console.log(text);
      output += text;
    });

    child.on('exit', function(code) {
      const failedSpecs = parseJunitOutput(output);
      let retry = false;

      if (failedSpecs.length > 0) {
        log('Failed Specs: ' + failedSpecs.join('\n'));
        if (attempts <= maxRetries) {
          retry = true;
        } else {
          log(`Exceeded Number of Attempts (${attempts})`);
        }
      }

      if (retry) {
          log(`Re-running Failed Specs (attempt #${attempts + 1})`);
          runWdio(failedSpecs);
      } else {
        log('Deleting temporary config file');
        fs.removeSync(confFile);
      }
    });
  }

  function buildConfFile() {
    const merge = require('lodash.mergewith');
    let env = '';
    const services = [];

    if (process.argv) {
      if (process.argv.some(a => a === '--dev')) {
        env = 'dev';
      }

      if (process.argv.some(a => a === '--prod')) {
        env = 'prod';
      }

      if (process.argv.some(a => a === '--sauce')) {
        services.push('sauce');
      }

      if (process.argv.some(a => a === '--headless')) {
        services.push('headless');
      }
    }

    // load default config and append the number of attempts for logging
    let config = require(`./wdio.conf`).config;
    config.attempts = attempts;

    // merge environment config
    if (env) {
      log(`Using ${env} configuration`);
      config = merge(config, require(`./wdio.${env}.conf`).config);
    } else {
      log(`Using default configuration`);
    }

    // merge service config and make sure arrays are overwritten
    for (let i = 0; i < services.length; i++) {
      log(`Using ${services[i]} service configuration`);
      config = merge(config, require(`./wdio.${services[i]}.conf`).config, function(objValue, srcValue) {
        return srcValue;
      });
    }

    // generate wdio conf file and handle functions within the JSON
    fs.outputFileSync(confFile, 'exports.config  = ' + JSON.stringify(config, function(k, v) {
      return (typeof v === 'function' ) ? v.toString() : v;
    })
    .replace(/\\r\\n/g, '\r\n')
    .replace(/"function/g, 'function')
    .replace(/"async function/g, 'async function')
    .replace(/}"/g, '}'));
  }

  function parseJunitOutput(text) {
    const failedSpecs = [];
    const failingRegex = /] \d+ failing/gm;
    const filenameRegex = /] Spec: (.+\.ts$)/gm;
    const specSeperator = '------------------------------------------------------------------';
    const specOutputArr = text.split(specSeperator);
    let match;

    for (let i = 0; i < specOutputArr.length; i++) {
      const specOutput = specOutputArr[i];
      const failed = failingRegex.test(specOutput);
      if (!failed) {
        continue;
      }
      while ((match = filenameRegex.exec(specOutput))) {
        if (match.length > 1) {
          const failedSpec = match[1];
          failedSpecs.push(failedSpec);
        }
      }
    }

    return failedSpecs;
  }

  function deleteTestResults() {
    log('Deleting old test results');
    fs.removeSync('testresults');
  }

  function log(message) {
    console.log(`*** ${message} ***`);
  }
}

runner();
