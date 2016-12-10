'use strict';

var path = require('path')
  , confit = require('confit')
  , nconf = require('nconf')
  , process= require('process')
  , bluebird= require('bluebird')
  ;

var promisifyLib = require('./../../lib/promisifyLib')
  , databaseLib=require('../../lib/databaseLib')
  , aclLib=require('../../lib/aclLib')
  , loggerLib=require('../../lib/loggerLib')
  ;

//On récupere le paramètre passé dans la ligne de commande
var ldap = process.argv[2];
if (typeof ldap !== 'string'){
    console.error('LDAP obligatoire en argument');
    console.error('');
    console.error('example:');
    console.error('  node admin.json <codeldap>');
    console.error('');
    process.exit(1);
}

//on charge la conf
var basedir = path.join(__dirname+'../../../', 'config');
confit(basedir).create(function (err, config) {

    //on charge le package.json
    nconf.argv()
        .env()
        .file({ file: './package.json' });

     var packagejson={
        appName: nconf.get('name'),
        appVersion: nconf.get('version'),
        appAuthor: nconf.get('author'),
        appContributors: nconf.get('contributors')
    }

    /*
     * Add any additional config setup or overrides here. `config` is an initialized
     * `confit` (https://github.com/krakenjs/confit/) configuration object.
     */

    //maj de la conf avec des infos du package.json
    config.set('package.json', packagejson);


    //config d'un fichier de log différent du fichier de l'appli
    var loggerConfig=config.get('loggerConfig')
    if(loggerConfig && loggerConfig.file && typeof loggerConfig.file.filename === 'string'){
        loggerConfig.file.filename=loggerConfig.file.filename+'script_admin.log';
    }

    promisifyLib.promisifyConfig(function(err){
        if (err) { return next(err) ; }

        //configuration du logger
        loggerLib.loggerConfig(loggerConfig, function(){

            var logger=loggerLib.logger;

            //configuration de la bdd
            databaseLib.mongooseConfig(config.get('databaseConfig'), function(err){
                if (err) {
                    logger.error(err) ;
                    process.exit(1);
                }
                //configuration de la bdd ACL
                aclLib.aclConfig(config.get('databaseAclConfig'), function(err){

                    var acl= aclLib.acl;
                    if (err) {
                        logger.error(err) ;
                        process.exit(1);
                    }

                    var userModel=require('../../models/userModel');

                    //init top isAdmin and ACL for <codeldap>
                    userModel.findOneAsync({uid:ldap}).then(function(userFinded){
                        if(!userFinded){
                            logger.warn('create admin user '+ldap);
                            userFinded=new userModel({uid:ldap});
                        }else{
                            logger.warn('update user '+ldap+' to admin');
                        }
                        userFinded.isAdmin=true;
                        return userFinded.saveAsync();
                    }).then(function(){
                        logger.warn('viewer Role add to '+ldap);
                        return acl.addUserRolesAsync(ldap, 'viewer');
                    }).then(function(){
                        logger.warn('contributor Role add to '+ldap);
                        return acl.addUserRolesAsync(ldap, 'contributor');
                    }).then(function(){
                        console.log('Finish without error');
                        process.exit(0)
                    }).catch(function(err){
                        logger.error(err) ;
                        process.exit(1);
                    })
                });
            });
        });
    });
});
