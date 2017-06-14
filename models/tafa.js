createEmail: function (email) {
  cloudant.db.use('email').insert(email, function (er, body, headers) {
      if (er) {
        return console.log('Failed to insert into alice database: ' + er.message);
      }
      // Change the cookie if Cloudant tells us to.
      if (headers && headers['set-cookie']) {
        cookies[username] = headers['set-cookie'];
      }
      console.log(body);
    })
  },

updateEmail: function(){
  action.createEmail(email);
}

}

var cloudant = new Promise((resolve, reject) => { Cloudant({account:"marrakchim", username:"hedoindedienctoessayston", password:"5fb2b1b257e52883589d87ebf42e4ecfd6928924"}, function(er, cloudant, reply) {
}); resolve()

}).then(function(){
foo = action[actionAsked];
foo();
}
)
