/*eslint no-console: 0*/
'use strict';

const app = require('./index');

const http = require('http')
  , fs = require('fs')
  , path = require('path');

const sslRootCas = require('ssl-root-cas').inject();

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

const server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
