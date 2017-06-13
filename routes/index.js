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
    var email = new Email(req.body);
    new Promise((resolve, reject) =>{ EmailBDD(email, "createEmail"); resolve()})
      .then((email)=>
        {
          console.log("Ola1");
          EmailHandler(email);
          resolve();
        })
          .then((email)=>{
            console.log("Ola2");
            console.log(email);
            res.json(EmailUpdater((email), ["updateMessageStatus", "updateMessageDate"]))
        })
  //  res.json(EmailUpdater(EmailHandler(email), ["updateMessageStatus", "updateMessageDate"]));
  }
});

router.get('/email-bdd', function(req, res) {
});


module.exports = router;
