var Cloudant = require('cloudant');
var EmailVerif = require('../tools/email-verification');


/**
 * The Email Manager, that will create, update, and get email. (no destruction since we can't delete email)
       @module EmailBDD
     * @version 1.0
 */
function EmailBDD(email, actionAsked){
  /** A promise is necessary for the flow of post requête: send-email */
  return new Promise((resolve, reject) => {

    /** function in order to connect to cloudant, with as a callback function, the actionAsked, the performed action */
    var cloudant = Cloudant({account:"marrakchim", username:"hedoindedienctoessayston", password:"5fb2b1b257e52883589d87ebf42e4ecfd6928924"}, function(er, cloudant, reply) {
      if (er) {
        throw er;
      }else{

        console.log('Connected with username: %s', reply.userCtx.name);
        foo = action[actionAsked];
        foo();
      }

    })

    var db = cloudant.db.use('email');

    var foo = function () {}

    var action = {

      /**
        * get all email of a corresponding sender's email adress
        * requierement: param must be the sender's email adress in string format
        * @exports EmailBDD/setIndex
        * @namespace setIndex
      */

      setIndex: function(){
        var email_by_idMailjet = function(doc) {
          if (doc.idMailjet) {
            // This looks like a book.
            index('idMailjet', doc.idMailjet);
          }
        }

        var ddoc = {
          _id: '_design/byIdMailjet',
          indexes: {
            email: {
              analyzer: {name: 'standard'},
              index   : email_by_idMailjet
            }
          }
        };


          db.insert(dddoc, function (er, result) {
            if (er) {
              throw er;
            }
          });

      },

      /**
           * get all email of a corresponding sender's email adress
           * requierement: param must be the sender's email adress in string format
           * @exports EmailBDD/getEmailByUserEmail
           * @namespace getEmailByUserEmail
      */
      getEmailByUserEmail: function () {
          db.find({selector:{replyTo:email}}, function(er, result) {
            if (er) {
              reject(er);
            }else{
              if(result.docs.length === 0){
                reject("id uncorrect");
              }
              for (var i = 0; i<result.docs.length; i++){
                result.docs[i]._rev = undefined
              }
              resolve(result.docs)
            }
          })
      },

      /**
           * get an email with a corresponding idMailjet
           * requierement: param must be the idMailjet of the email in string format
           * @exports emailBDD/getEmailByIdMailjet
           * @namespace getEmailByIdMailjet
      */
      getEmailByIdMailjet: function () {
      db.find({selector:{idMailjet:email}}, function(er, result) {
        if (er) {
          reject(er);
        }else{
          if(result.docs.length === 0){
            reject("id uncorrect");
          }
          resolve(result.docs[0])
        }
      })
    },

    /**
         * get an email with a corresponding idPost
         * requierement: param must be the idPost of the email in string format
         * @exports emailBDD/getEmailByIdPost
         * @namespace getEmailByIdPost
    */
      getEmailByIdPost: function () {
          var req = {}
          req['db'] = "email"
          req['doc'] = email
          req['method'] = "get"

          cloudant.request(req, function(err, data) {
              if (err){
                reject(err)
              }else{
                  if("undefined" === typeof data){
                    reject("idPost uncorrect");
                  }
                  resolve(data);
              }
          })
      },

      /**
           * insert email in database
           * requierement: email must respect its form, cf model: email
           * @exports emailBDD/createEmail
           * @namespace createEmail
      */
      createEmail: function () {
            db.insert(email, function (er, body, headers) {
                if (er) {
                  reject(er);
                }else{
                  // Change the cookie if Cloudant tells us to.
                  if (headers && headers['set-cookie']) {
                    cookies[username] = headers['set-cookie'];
                  }
                  email._rev = body.rev
                  resolve(email)
                }
              })

      },

      /**
           * update email in database
           * requierement: email must respect its form, you'll need a _rev as well, you might call get the email from database and then update it
           * @exports emailBDD/updateEmail
           * @namespace createEmail
      */
      updateEmail: function(){

              db.bulk({docs:[email]}, function (er, body, headers) {
                  if (er) {
                    reject(er)
                  }else{
                    // Change the cookie if Cloudant tells us to.
                    if (headers && headers['set-cookie']) {
                      cookies[username] = headers['set-cookie'];
                    }
                    resolve(email);
                  }
                  // Change the cookie if Cloudant tells us to.
                  if (headers && headers['set-cookie']) {
                    cookies[username] = headers['set-cookie'];
                  }
                })

      }

    }
  })

}

module.exports = EmailBDD;
