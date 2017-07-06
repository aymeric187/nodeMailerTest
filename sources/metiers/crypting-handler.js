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
  return new Promise((resolve, reject) => {

    console.log('foo')
  var foo = function () {}

  var action = {
    verifyPassApi : function(){
      var md = forge.md.sha1.create();
      md.update('surtoutnepasoublier', 'utf8');
      var passhash = md.digest().toHex();
      var isAccepted = (signature === passhash)
      resolve(isAccepted)
    },

    decryptSignature : function(){
      console.log(signture)
      //var privateNoCrypt = fs.readFileSync(path.join(__dirname, '/../private_unencrypted.pem'), 'utf8');
      //var privateKey = PKI.privateKeyFromPem(privateNoCrypt);
      resolve(signature)
      //return privateKey.decrypt(signature);

    }
  }

  foo = action[actionAsked];
  foo();
  })

}

module.exports = CryptingHandler;
