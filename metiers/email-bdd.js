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
              reject(er);
            }else{
              if(result.docs.length === 0){
                reject("id uncorrect");
              }
              resolve(result.docs)
            }
          })
      },


      getEmailByIdPost: function () {

        db.find({selector:{_id:email}}, function(er, result) {
          if (er) {
            reject(er);
          }else{
            if("undefined" === typeof result.docs[0]){
              reject("idPost uncorrect");
            }
            resolve(result.docs[0]);
          }
        });
      },

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
