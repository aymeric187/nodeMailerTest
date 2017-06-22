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

    var foo2 = function () {}


    var action = {

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


      getEmailByIdMailjet: function () {
        // Note, you can make a normal JavaScript function. It is not necessary
      // for you to convert it to a string as with other languages and tools.

      db.find({selector:{idMailjet:email}}, function(er, result) {
        if (er) {
          console.log(er)
          reject(er);
        }else{
          if(result.docs.length === 0){
            reject("id uncorrect");
          }
          resolve(result.docs[0])
        }
      })
    },
/*
      getEmailByIdMailjet: function () {
        // Note, you can make a normal JavaScript function. It is not necessary
      // for you to convert it to a string as with other languages and tools.

        db.search('byIdMailjet', 'email', {q:'idMailjet:'+email}, function(er, result) {
          if (er) {
            console.log(er);
            reject(er);
          }
          console.log(email)
        if(result){
          console.log(result);
          for (var i = 0; i < result.rows.length; i++) {
            var valueString = JSON.stringify(result.rows[i]);
            email = JSON.parse(valueString).id;
            console.log(email)
            foo2 = action["getEmailByIdPost"];
            foo2();
          }
        }
        else{reject(result)}
        });
      },
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
                  console.log("idPost")
                  resolve(data);
              }
          })
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
              console.log(email);
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
              console.log(body)
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
