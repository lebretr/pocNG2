'use strict';
/**
 * Middleware for determining the language to show the user
 *
 *  config() permet de recuperer la langue par defaut de l'appli et
 *  de le sauvegarder comme attribut de la fonction start()
 *
 *  la fonction est appele a chaque appelle d'une url. cette fonction recupere la langue
 *  dans le cookie dans la requete en entree et l'enregistre dans la reponse.
 *  si aucune langue n'est presente dans la requete d'entree alors on prend la langue du navigateur.
 *  Si la langue du navigateur n'est pas gere dans cette appli alors on prends
 *  la langue parametree dans ./congig/app.json
 *
 *  code des langues: http://www.metamodpro.com/browser-language-codes
 */

var bcp47 = require('bcp47');

exports.languageLib = function(conf){
    return function languageLib (req, res, next) {
        //Pick up the language cookie.
        var locale = req.cookies && req.cookies.locale;

        var userLanguage = locale || req.cookies.language;

        if (!userLanguage) {
            var navigatorLangage=req.headers['accept-language'] ? req.headers['accept-language'].substr(0,2).toLowerCase() : '';
            var defaultLangage = conf.fallback;

            var language = {'fr':'fr-FR','en':'en-US' /*,'es':'es-es','it':'it-it','ro':'ro-ro','uk':'uk-uk'*/};
            
            
            if(typeof language[navigatorLangage]==='string'){
                userLanguage=language[navigatorLangage];
                res.cookie('language', userLanguage);
            }else{
                userLanguage=defaultLangage;
            }
        } 

        //Set the locality for this response. The template will pick the appropriate bundle
        res.locals = res.locals || {};
        
        //i18n dans makara2
        res.locals.locale = req.locale = bcp47.parse(userLanguage); 
        res.locals.locality = userLanguage;
        
        next();
    };
};