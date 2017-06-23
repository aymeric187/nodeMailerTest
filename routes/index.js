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
  EmailVerif(req.body).then(function(){
      var email = new Email(req.body)
      EmailBDD(email, "createEmail")

          .then((email)=>{
            EmailHandler(email)

                  .then((email)=>{
                    EmailBDD(email, "updateEmail").then((email)=> {   email._rev = undefined; return res.json(email)})
                  })
                  .catch((error)=> { return res.json(error) })
          })
          .catch((error)=> { return res.json(error) })
      })
      .catch((error)=> { return res.json(error) })


})

  //  res.json(EmailUpdater(EmailHandler(email), ["updateMessageStatus", "updateMessageDate"]));

router.get('/email-single', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> {  email._rev = undefined; res.json(email)}).catch((error)=>{ res.json(error)})
});
/*
router.get('/setIndex', function(req, res) {
  EmailBDD(" ", "setIndex").then((email)=> { res.json(email)}).catch((error)=>{ res.json(error)})
});

router.get('/email-idMailjet', function(req, res) {
  EmailBDD(req.query.idMailjet, "getEmailByIdMailjet").then((email)=> { res.json(email)}).catch((error)=>{ res.json(error)})
});
//*/
router.get('/email-list', function(req, res) {
  EmailBDD(req.query.email, "getEmailByUserEmail").then((emailArray)=> { res.json(emailArray) }).catch((error)=> { res.json(error)})
});

router.get('/email-status', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email.status) }).catch((error)=>{ res.json(error)})
});

router.get('/email-dateMailjetSent', function(req, res) {
  EmailBDD(req.body._id, "getEmailByIdPost").then((email)=> { res.json(email.dateMailjetSent) }).catch((error)=>{ res.json(error)})
});

router.get('/email-dateMailjetOpened', function(req, res) {
  EmailBDD(req.body._id, "getEmailByIdPost").then((email)=> { res.json(email.dateMailjetOpened) }).catch((error)=>{ res.json(error)})
});

router.get('/email-datePost', function(req, res) {
  EmailBDD(req.body._id, "getEmailByIdPost").then((email)=> { res.json(email.datePost) }).catch((error)=>{ res.json(error)})
});


router.post('/email-event-catcher', function(req,res){

          idMailjet = req.body.MessageID.toString()

          if(idMailjet && req.body.time && req.body.event){
          EmailBDD(idMailjet, "getEmailByIdMailjet")
            .then((email)=> {
              email.dateMailjetOpened = req.body.time
              email.status = req.body.event
              EmailBDD(email, "updateEmail")
                .then((email)=> {  res.sendStatus(200)})
                .catch((error)=> { res.sendStatus(200)});
            })
            .catch((error)=>{  return res.sendStatus(200)})
          }else{ res.sendStatus(200)}

})


module.exports = router;
