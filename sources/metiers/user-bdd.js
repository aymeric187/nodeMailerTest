var Cloudant = require('cloudant');
var EmailVerif = require('../tools/email-verification');


/**
 * The Email Manager, that will create, update, and get email. (no destruction since we can't delete email)
       @module EmailBDD
     * @version 1.0
 */
function UserBDD(param, actionAsked){
  /** A promise is necessary for the flow of post requête: send-email */
  return new Promise((resolve, reject) => {

    /** function in order to connect to cloudant, with as a callback function, the actionAsked, the performed action */
    var cloudant = Cloudant({account:"marrakchim", username:"thadanighentremeridownyt", password:"3da4aeda2c459cc7d26501602bb9a4efcbfa90bc"}, function(er, cloudant, reply) {
      if (er) {
        console.log(er)
        throw er;
      }else{

        console.log('Connected with username: %s', reply.userCtx.name);
        foo = action[actionAsked];
        foo();
      }

    })

    var db = cloudant.db.use('user');

    var foo = function () {}

    var action = {


      /**
           * get all email of a corresponding sender's email adress
           * requierement: param must be the sender's email adress in string format
           * @exports EmailBDD/getEmailByUserEmail
           * @namespace getEmailByUserEmail
      */
      getUserByUsername: function () {
          db.find({selector:{username:param}}, function(er, result) {
            if (er) {
              console.log(er)
              reject(er);
            }else{
              if(result.docs.length === 0){
                reject("username uncorrect");
              }
              resolve(result.docs[0])
            }
          })
      },
      /**
           * insert email in database
           * requierement: email must respect its form, cf model: email
           * @exports emailBDD/createEmail
           * @namespace createEmail
      */
      createUser: function () {
            param.password = CryptingHandler(param.password)
            db.insert(param, function (er, body, headers) {
                if (er) {
                  reject(er);
                }else{
                  // Change the cookie if Cloudant tells us to.
                  if (headers && headers['set-cookie']) {
                    cookies[username] = headers['set-cookie'];
                  }
                  param.password = undefined
                  param._rev = body.rev
                  resolve(param)
                }
              })

      }


    }

  })
}

module.exports = UserBDD;
