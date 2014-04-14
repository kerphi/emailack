'use strict';

/**
 * This module is responsible of the emailack configuration parameters
 * it will load it from the default config.json file but these parameters
 * can be overrided by the user through a config.local.json file or
 * through the environement variables or through the command line parameter
 */

var nconf   = require('nconf');

// local configuration file does not necessarily exist
var localConf = {};
try {
  localConf = require('../config.local.js');
} catch (err) { }

console.log(localConf)

nconf.argv()
     .env()
     .overrides(localConf)
     .defaults(require('../config.js'));

// return all the captured key/values
module.exports = nconf.get();