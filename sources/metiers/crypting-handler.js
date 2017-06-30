/**
 * CryptingHandler
        @module CryptingHandler
     * @version 1.0
 */

 var keypair = require('keypair');
 var forge = require('node-forge');

function CryptingHandler(email, actionAsked){

      var md = forge.md.sha512.create();
      md.update('password');
      console.log(md.digest().toHex());

      /**
     * generates random string of characters i.e salt
     * @function
     * @param {number} length - Length of the random string.
     */
/*    var genRandomString = function(length){
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') // convert to hexadecimal format
                .slice(0,length);   // return required number of characters
    };
//*/
    var pair = keypair();

    authen = {}
    authen['key'] = pair.public
    authen['salt'] =  "capjhd82lne,;123;ohfm;:mù".toString(hex);


        /**
     * hash password with sha512.
     * @function
     * @param {string} password - List of required fields.
     * @param {string} salt - Data to be validated.
     */
/*
    var sha512 = function(password, salt){
      // SHA-512
          var md = forge.md.sha512.create();
          md.update('The quick brown fox jumps over the lazy dog');
          console.log(md);
          console.log(md.digest());
        return {
            salt:salt,
            passwordHash:value
        };
    };
//*/


}

module.exports = CryptingHandler;
