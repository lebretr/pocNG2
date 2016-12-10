/*eslint no-console: 0*/
'use strict';

const app = require('./index');

const fs = require('fs')
    , path = require('path')
    , process = require('process')
    ;

const sslRootCas = require('ssl-root-cas').inject();

let client = require('http');

let port = process.env.PORT || 8000;
let protocol= 'http';
let server;

try{
    const pfx = fs.readFileSync( process.env.pfx || 'no_certificate' );
    const passphrase = process.env.passphrase || 'no_certificate';

    if(pfx && passphrase){
        client = require('https');
        server = client.createServer({
            pfx: pfx,
            passphrase: passphrase
        }, app);
        protocol='https';
        port = process.env.PORT || 8443;
    }
}catch(e){ null; }

server = server || client.createServer(app);

/*
 * Injection des certificats Authorité
 */
const certificatesDirectory=path.join(__dirname, '/ressources/certificates_authorite/');
let certificates=fs.readdirSync(certificatesDirectory);

for(let i=0, end=certificates.length; i<end; i++){
    sslRootCas.addFile(path.join(certificatesDirectory,certificates[i]));
}

/*
 * Create and start HTTP server.
 */

server.listen(port || 8000);
server.on('listening', function () {
    console.log('Server listening on %s://localhost:%d', protocol, this.address().port);
});
