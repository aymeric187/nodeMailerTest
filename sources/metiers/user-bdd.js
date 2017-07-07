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
    var cloudant = Cloudant({account:"marrakchim", username:"theiredeltherywhandersen", password:"65fe94dfd1003c1d211b635a9d033c7e81e685fb"}, function(er, cloudant, reply) {
      if (er) {
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
              reject(er);
            }else{
              if(result.docs.length === 0){
                reject("username uncorrect");
              }
              console.log(param)
              console.log(result.docs[0])
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
            db.insert(param, function (er, body, headers) {
                if (er) {
                  console.log(er)
                  reject(er);
                }else{
                  // Change the cookie if Cloudant tells us to.
                  if (headers && headers['set-cookie']) {
                    cookies[username] = headers['set-cookie'];
                  }
                  console.log(body)
                  console.log(param)
                  param._rev = undefined
                  param.password = undefined

                  resolve(param)
                }
              })



      }


    }

  })
}

module.exports = UserBDD;
