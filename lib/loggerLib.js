/*eslint no-console: 0*/

'use strict';

var Bluebird = require('bluebird')
  , winston = require('winston');

winston.msg=winston.log;
winston.log=function(a,b,c,d,e){
    a=a || null, b=b || null, c=c || null, d=d || null, e=e || null;

    if(a==='silly' || a==='debug' || a==='verbose' || a==='info' || a==='warn' || a==='error'){
        winston.msg(a,b,c,d,e);
    }else{
        winston.verbose(a,b,c,d,e);
    }
};

winston.hack=function(message){
    console.warn([
        '\x1b[47m\x1b[31;1m' +'HACK WARNING:' +'\x1b[22;39m', // bold cyan
        '\x1b[30;1m'+ message +'\x1b[22;39m', // bold yellow
        '\x1b[0m' + '' + '\x1b[39m'
    ].join(' '));
};

exports.configure = function (conf, next) {
    var logger=winston;

    if(conf && conf.file && conf.file.maxsize){
        conf.file.maxsize=conf.file.maxsize * 1024 * 1024;
    }

    if(conf && conf.console){
        winston.remove(winston.transports.Console);
        winston.add(winston.transports.Console, conf.console);
    }
    if(conf && conf.file){
        winston.add(winston.transports.File, conf.file);
    }

    if(conf && conf.replaceNodeJsConsole){
        console.log=logger.verbose;
        console.info=logger.info;
        console.warn=logger.warn;
        console.error=logger.error;
    }

    exports.logger=winston;

    next();
};

exports.configureAsync = Bluebird.promisify(exports.configure);

exports.logError = function () {
    return function loggerLib (err, req, res, next) {
        if(err.stack){
            winston.error(err.stack);
        }else{
            winston.error(err);
        }

        next(err);
    };
};
