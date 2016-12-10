'use strict';

exports.addConstantes = function(){
    return function (req, res, next) {
        //Pick up the language cookie.
        var constantes = req.app.kraken.get('package.json');

        // constantes.name='WebRich';

        res.locals._constantes = constantes;
        
        res.locals._user = req.session.user;

        next();
    };
};