var Cloudant = require('cloudant');


function EmailBDD(email, actionAsked){

  return new Promise((resolve, reject) => {

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

      getEmailByUserEmail: function () {
          db.find({selector:{replyTo:email}}, function(er, result) {
            if (er) {
              throw er;
            }
            if(result.docs.length === 0){
              reject("id uncorrect");
            }
            resolve(result.docs)
          })
      },


      getEmailByIdPost: function () {
        var EmailUpdater = require('../metiers/email-updater');

        db.find({selector:{_id:email}}, function(er, result) {
          if (er) {
            throw er;
          }
          console.log(typeof result.docs)
          if("undefined" === typeof result.docs[0]){
            reject("idPost uncorrect");
          }
          if(result.docs[0].hasOwnProperty("idMailjet")){
            EmailUpdater(result.docs[0], ["updateMessageStatus"]).then((email)=> { resolve(email)})
          }else{
            resolve(result.docs[0]);
          }
        })
      },

      createEmail: function () {
        db.insert(email, function (er, body, headers) {
            if (er) {
              return console.log('Failed to insert into alice database: ' + er.message + "....." + er);
            }
            // Change the cookie if Cloudant tells us to.
            if (headers && headers['set-cookie']) {
              cookies[username] = headers['set-cookie'];
            }
            email._rev = body.rev
            resolve(email)
          })
        },

      updateEmail: function(){
        db.bulk({docs:[email]}, function (er, body, headers) {
            if (er) {
              return console.log('Failed to insert into alice database: ' + er.message + "....." + er);
            }
            // Change the cookie if Cloudant tells us to.
            if (headers && headers['set-cookie']) {
              cookies[username] = headers['set-cookie'];
            }
          })
          resolve(email);
      }

    }
  })

}

module.exports = EmailBDD;
