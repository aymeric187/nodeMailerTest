var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Email = require('../models/email-model');
var EmailBDD = require('../metiers/email-bdd');
var EmailHandler = require('../metiers/email-handler');
var EmailUpdater = require('../metiers/email-updater');
var EmailVerif = require('../tools/email-verification');

var bodyParser = require('body-parser');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send-email', function(req, res) {
  if(EmailVerif(req.body)){
    new Promise((resolve, reject) => { console.log("ola-1"); var email = new Email(req.body); console.log(email); resolve(email)
    })


      .then((email) =>{
        console.log("Ola0");
        console.log(email);
        var emailBDD = EmailBDD(email, "createEmail")




          emailBDD.then((email)=>{
            console.log("Ola2");
            console.log(email);
            var emailAPI = EmailHandler(email)


                  emailAPI.then((email)=>{
                    console.log("Ola4");
                    console.log(email);
                    if(email.hasOwnProperty("idMailjet")){
                      res.json(EmailUpdater((email), ["updateMessageStatus", "updateMessageDate"]))
                    }
                  })

          })
      })


      .catch(function(error){
        console.log("erreur : "+error);
      });

    }

})

  //  res.json(EmailUpdater(EmailHandler(email), ["updateMessageStatus", "updateMessageDate"]));

router.get('/email-bdd', function(req, res) {
  var emailBDD = EmailBDD(req.body.id, "getEmailByIdPost")
  emailBDD.then((email)=> { res.json(email) })
});


module.exports = router;
