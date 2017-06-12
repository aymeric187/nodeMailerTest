var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var EmailHandler = require('../metiers/email-handler');
var EmailUpdater = require('../metiers/email-updater');
var Email = require('../models/email-model');
var EmailVerif = require('../tools/email-verification');

var bodyParser = require('body-parser');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send-email', function(req, res) {
  if(EmailVerif(req.body)){
    res.json(EmailUpdater({ID: EmailHandler(new Email(req.body))})));
    console.log("good");
  }
});

router.get('/accuse-reception', function(req, res) {
  EmailUpdater("18859019858613553");
});


module.exports = router;
