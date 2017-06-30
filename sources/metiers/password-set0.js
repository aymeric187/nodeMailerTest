var keypair = require('keypair');
var forge = require('node-forge');
var fs = require('fs');

function PasswordSet(password){
  var rsa = forge.pki.rsa;
  var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
  // sign data with a private key and output DigestInfo DER-encoded bytes
  // (defaults to RSASSA PKCS#1 v1.5)
  var md = forge.md.sha1.create();
  md.update(password, 'utf8');
  var passhash = md.digest().toHex();



// convert a Forge public key to PEM-format
var pemPublic = forge.pki.publicKeyToPem(keypair.publicKey);


// convert a PEM-formatted public key to a Forge public key
var publicKeyCry = forge.pki.publicKeyFromPem(pemPublic);



  // encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
var encrypted = publicKeyCry.encrypt(publicKeyCry);

// convert a Forge private key to PEM-format
// (preferred method if you don't want encryption)
var pemPrivate = forge.pki.privateKeyToPem(keypair.privateKey);

var tada = forge.pki.privateKeyFromPem(pemPrivate)

console.log(tada.decrypt(encrypted))
// decrypts a PEM-formatted, encrypted private key
var privateKey = forge.pki.decryptRsaPrivateKey(pemPrivate);



console.log(tada)
console.log(passhash)
console.log(tada.decrypt(encrypted))

console.log(keypair.privateKey === tada)

/*
    keyPublic = pair.public

     var md = forge.md.sha512.create();
     md.update(password);
     var passhash =  md.digest().toHex();
*/
     // openssl enc -des3 -in input.txt -out input.enc


    function clientSide(buf2, keyPublic){
       var mdClient = forge.md.sha512.create();
       mdClient.update("password");
       var passhashClient =  md.digest().toHex();


       return endClient
     }



}
module.exports = PasswordSet;
