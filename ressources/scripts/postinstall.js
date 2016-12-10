/**
*	Ce postintall permet d'executer le scipt postinstall.sh
*	si l'os est un Linux et si la variable d'environnement 
*	"NODE_SERVEUR" a la valeur "TRUE" ou "NODE_ENV" a la valeur "production"
*/


var osType=require('os').type();
var nodeServeur=process.env.NODE_SERVEUR;
var nodeEnv=process.env.NODE_ENV;


console.log('OS: '+osType);
console.log('nodeServeur: '+nodeServeur);

if(osType==='Linux' && (nodeServeur==="TRUE" || nodeEnv==="production")){

	console.log('Droit execution pour ./ressources/scripts/postinstall.sh');
	require('fs').chmodSync('./ressources/scripts/postinstall.sh', 0764);

	console.log('Execution de ./ressources/scripts/postinstall.sh');
	require('child_process').execFile('./ressources/scripts/postinstall.sh', function(error, stdout, stderr){
		
		console.log(stdout);
		console.error(stderr);

		if (error){
			throw 'postinstall.sh';
		}
	});
}else{
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	console.log('ATTENTION: SI CET ENVIRONNEMENT N\'EST PAS UN SERVEUR ALORS VOUS N\'AVEZ RIEN A FAIRE');
	console.log('DANS LE CAS CONTRAIRE, VEUILLEZ POSITIONNER LA VARIABLE D\'ENVIRONNEMENT NODE_ENV À production POUR EXECUTER LE SCRIPT postinstall.sh');
	console.log('export NODE_ENV="production"');
	console.log('AJOUTER CETTE LIGNE DE COMMANDE DANS LE FICHIER .profile DE VOTRE HOME POUR RENDRE LA MODIFICATION PERMANENTE');
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}
