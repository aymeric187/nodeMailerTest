var forge = require('node-forge');
var PKI = forge.pki
const fs = require('fs');
var path = require('path');



/**
 * CryptingHandler
        @module CryptingHandler
     * @version 1.0
 */
function CryptingHandler(signature){

    var rsa = forge.pki.rsa;

    var md = forge.md.sha1.create();
    md.update('password', 'utf8');
    var passhash = md.digest().toHex();
    //var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
    var publicKeyFromFile = fs.readFileSync(path.join(__dirname, '/../public.pem'), 'utf8');
    var privateNoCrypt = fs.readFileSync(path.join(__dirname, '/../private_unencrypted.pem'), 'utf8');

    var publicKey = PKI.publicKeyFromPem(publicKeyFromFile);
    var privateKey = PKI.publicKeyFromPem(privateNoCrypt);

    //var signature = publicKey.encrypt(passhash);
    var decrypted = privateKey.decrypt(signature);

    return passhash === decrypted;


}

module.exports = CryptingHandler;
