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

      getEmailByUserEmail: function (userEmail) {
        new Promise(resolve => {
          db.allDocs({
            include_docs: true
          }).then((result) => {
            this.data = [];
            result.rows.map((row) => {
              if(row.doc.type == 'email')
                if(row.doc.from == userEmail){
                  this.data.push(row.doc);
                  console.log(row.doc)
                }
            });
            resolve(this.data);
          }).catch((error) => {
            console.log(error);
          });
        });
      },

      getEmailByIdPost: function (email) {
        new Promise(resolve => {
          db.bulk({docs:[{_id: email}]}, function(er, res) {
            if (er) {
              throw er;
            }

            console.log('Inserted all documents'+ JSON.stringify(res));
          });
        });
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

            email._rev = body.rev;

          })
          resolve(email);
        },

      updateEmail: function(){
        action["createEmail"]
      }

    }
  })
}

module.exports = EmailBDD;
