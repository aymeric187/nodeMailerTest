var Cloudant = require('cloudant');

function EmailBDD(email, actionAsked){

  this.email = email;
  var cloudant =
    Cloudant({account:"marrakchim", username:"hedoindedienctoessayston", password:"5fb2b1b257e52883589d87ebf42e4ecfd6928924"}, new Promise(function (resolve, reject) {
      function(er, cloudant, reply){
        if (er) {
          reject();
          throw er;
        }else{
          var db = cloudant.db.use('email').then(console.log('todo'))
          this.db = db;

          resolve();
        }
      }


    }).then(() => {
      var action = {

        getEmailByUserEmail: function (userEmail) {
          new Promise(resolve => {
            this.db.allDocs({
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
          return this.db.put(this.email).then(() => {console.log("in create function")}).catch((error) => {console.log("erreur: "+err);});
        },

        updateEmail: function(){
          this.action.createEmail(this.email);
        }

      }
        action[actionAsked];
      }
    )
  )

}
