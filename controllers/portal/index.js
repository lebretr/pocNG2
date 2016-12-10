'use strict';

// var logger = require('winston')
//   ;

module.exports = function (router) {

    var portal = (req, res/*, next*/) => {
        res.render('index', {
            name: 'Index'
        });
    };

    router.get('/', portal);

    router.get('/*', portal);

};
