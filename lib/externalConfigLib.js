/*eslint no-console: 0*/
'use strict';

var Bluebird = require('bluebird')
  , fs = require('fs')
  , path = require('path')
  , cjson = require('cjson')
  ;

exports.configure = function (config, next) {

    let name;
    try{
        let packagejson = cjson.load('./package.json');

        name=packagejson.name;

        //destructuration avec ES6
        const packagejsonSimplifier=({ name, version, author, contributors })=> ({name, version, author, contributors});
        /*
        ce qui revient à ecrire:
        const packagejsonSimplifier= function({ name, version, author, contributors }){
            return {name, version, author, contributors}
        };
        ou:
        const packagejsonSimplifier= function(obj){
            return {
                name:obj.name,
                version:obj.version,
                author:obj.author,
                contributors: obj.contributor}
        };
        */

        let packagejsonConf= packagejsonSimplifier(packagejson);

        config.set('package.json', packagejsonConf);
    }catch(err){
        console.log('no access Read to file or badly formed: ./package.json');
    }

    let externalConf='';
    try{
        //on regarde dans la conf si il existe un parametre vers un fichier (ou repertoire) de conf externe
        externalConf = config.get('externalConf');

        //si rien dans la conf alors on initialise le chemin avec une valeur par defaut qui correspondrait à un serveur
        if(typeof externalConf !== 'string'){
            //  externalConf='/home2/appmanager/refenv/conf/' + (name || 'param') + '.json';
            return next();
        }

        //on regarde si le fichier existe
        //une erreur est généré en cas d'echec
        fs.accessSync(externalConf, fs.R_OK);

        //on recupere les stat du fichier (ou dossier)
        let stat = fs.statSync(externalConf);
        //si c'est un dossier alors on ajoute un nom de fichier au chemin
        if(stat.isDirectory()){
            externalConf=path.join( externalConf, name + '.json');
        }

        //on regarde si le fichier existe
        //une erreur est généré en cas d'echec
        fs.accessSync(externalConf, fs.R_OK);

        //on charge le json
        let confExterne = cjson.load(externalConf);

        //on merge le json avec la conf de l'appli
        //NOTE: le json externe est prioritaire sur la conf de l'appli (les conf du dossier config de l'appli)
        config.use(confExterne);
    }catch(err){
        console.log('optional external config fille: no access Read to file or badly formed: ' + externalConf);
    }

    next();
};

exports.configureAsync = Bluebird.promisify(exports.configure);
