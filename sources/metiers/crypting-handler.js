/**
 * CryptingHandler
        @module CryptingHandler
     * @version 1.0
 */
function CryptingHandler(email, actionAsked){
  var keypair = require('keypair');
  var forge = require('node-forge');

  var pair = keypair();
  console.log(pair)
  var publicKey = forge.pki.publicKeyFromPem(pair.public);
  var ssh = forge.ssh.publicKeyToOpenSSH(publicKey, 'user@domain.tld');
  console.log(ssh);

  // generate a random key and IV
  // Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256
  var key = forge.random.getBytesSync(16);
  var iv = forge.random.getBytesSync(16);

  /* alternatively, generate a password-based 16-byte key
  var salt = forge.random.getBytesSync(128);
  var key = forge.pkcs5.pbkdf2('password', salt, numIterations, 16);
  */

  // encrypt some bytes using CBC mode
  // (other modes include: ECB, CFB, OFB, CTR, and GCM)
  // Note: CBC and ECB modes use PKCS#7 padding as default
  var cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(someBytes));
  cipher.finish();
  var encrypted = cipher.output;
  // outputs encrypted hex
  console.log(encrypted.toHex());

  // decrypt some bytes using CBC mode
  // (other modes include: CFB, OFB, CTR, and GCM)
  var decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({iv: iv});
  decipher.update(encrypted);
  decipher.finish();
  // outputs decrypted hex
  console.log(decipher.output.toHex());

  // encrypt some bytes using GCM mode
  var cipher = forge.cipher.createCipher('AES-GCM', key);
  cipher.start({
    iv: iv, // should be a 12-byte binary-encoded string or byte buffer
    additionalData: 'binary-encoded string', // optional
    tagLength: 128 // optional, defaults to 128 bits
  });
  cipher.update(forge.util.createBuffer(someBytes));
  cipher.finish();
  var encrypted = cipher.output;
  var tag = cipher.mode.tag;
  // outputs encrypted hex
  console.log(encrypted.toHex());
  // outputs authentication tag
  console.log(tag.toHex());

}

module.exports = CryptingHandler;