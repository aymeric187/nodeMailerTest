var Cloudant = require('cloudant');

function EmailBDD(email, actionAsked){

  var cloudant = Cloudant({account:"marrakchim", username:"hedoindedienctoessayston", password:"5fb2b1b257e52883589d87ebf42e4ecfd6928924"}, function(er, cloudant, reply) {
    if (er) {
      throw er;
    }else{
      console.log('Connected with username: %s', reply.userCtx.name);
    }

  })

  var db = cloudant.db.use('email');


    new Promise((resolve, reject) => {
      resolve(db)})

      .then(function(){



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

      createEmail: function () {
        db.insert(email, function (er, body, headers) {
            if (er) {
              return console.log('Failed to insert into alice database: ' + er.message);
            }
            // Change the cookie if Cloudant tells us to.
            if (headers && headers['set-cookie']) {
              cookies[username] = headers['set-cookie'];
            }
            console.log(body);
          })

          return email;
        },

      updateEmail: function(){
        action.createEmail();

      }

    }

    foo = action[actionAsked];
    foo();

  })





}

module.exports = EmailBDD;
