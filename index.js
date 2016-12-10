/*eslint no-console: 0*/
'use strict';

var express = require('express')
  , expressValidator = require('express-validator')
  , kraken = require('kraken-js')
  , bodyParser     = require('body-parser')
  , methodOverride = require('method-override')
  ;


var options, app;

app = module.exports = express();

/**
 * Activation du RESTFULL (get, post, put et delete) pour les controllers
 * NOTE: when using req.body, you must fully parse the request body
 *       before you call methodOverride() in your middleware stack,
 *       otherwise req.body will not be populated.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(
    function(req /*, res*/){
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }
));

// expressValidator must be immediately after express.bodyParser()!
app.use(expressValidator(require('./lib/expressValidatorLib')));

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        next(null, config);
    }
};

app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
