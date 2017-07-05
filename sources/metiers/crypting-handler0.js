var forge = require('node-forge');
var PKI = forge.pki
const fs = require('fs');
var path = require('path');



/**
 * CryptingHandler
        @module CryptingHandler
     * @version 1.0
 */
function CryptingHandler(signature, actionAsked){

    //var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
  //  var publicKeyFromFile = fs.readFileSync(path.join(__dirname, '/../public.pem'), 'utf8');

    //var publicKey = PKI.publicKeyFromPem(publicKeyFromFile);

    //var publicKeyFromFile = fs.writeFileSync(path.join(__dirname, '/../pass.txt'),publicKey.encrypt(passhash), 'utf8');
    //var test = fs.readFileSync(path.join(__dirname, '/../pass.txt'), 'utf8');

    //var isAccepted = passhash === password
    var foo = function () {}

    var theReturn;

    var action = {
      verifyPassApi : function(){
        var md = forge.md.sha1.create();
        md.update('surtoutnepasoublier', 'utf8');
        var passhash = md.digest().toHex();
        var isAccepted = (signature === passhash)
        theReturn =  isAccepted
      },

      decryptSignature : function(){
        //var privateNoCrypt = fs.readFileSync(path.join(__dirname, '/../private_unencrypted.pem'), 'utf8');
        //var privateKey = PKI.privateKeyFromPem(privateNoCrypt);
        theReturn = signature
        //return privateKey.decrypt(signature);

      }
    }

    foo = action[actionAsked];
    foo();
    return theReturn

}

module.exports = CryptingHandler;
