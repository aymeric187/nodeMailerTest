var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var emailControllers = require('../controllers/email-controller');
var EmailHandler = require('../routes/email-handler');
var Email = require('../models/email-model');
var bodyParser = require('body-parser');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send-email', function(req, res) {
    res.json(EmailHandler(new Email(req.body)));
});



module.exports = router;
