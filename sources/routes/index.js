var express = require('express');
var router = express.Router()
var nodemailer = require('nodemailer');
var Email = require('../models/email-model');
var EmailBDD = require('../metiers/email-bdd');
var EmailHandler = require('../metiers/email-handler');
var EmailVerif = require('../tools/email-verification');
var bodyParser = require('body-parser');

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

router.get('/email-single', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> {  email._rev = undefined; res.json(email)}).catch((error)=>{ res.json(error)})
});

router.get('/email-list', function(req, res) {
  EmailBDD(req.query.email, "getEmailByUserEmail").then((emailArray)=> { res.json(emailArray) }).catch((error)=> { res.json(error)})
});

router.get('/email-status', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email.status) }).catch((error)=>{ res.json(error)})
});

router.get('/email-dateMailjetSent', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email.dateMailjetSent) }).catch((error)=>{ res.json(error)})
});

router.get('/email-dateMailjetOpen', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email.dateMailjetOpen) }).catch((error)=>{ res.json(error)})
});

router.get('/email-datePost', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email.datePost) }).catch((error)=>{ res.json(error)})
});


router.post('/email-event-catcher', function(req,res){

          idMailjet = req.body.MessageID.toString()

          if(idMailjet && req.body.time && req.body.event){
          EmailBDD(idMailjet, "getEmailByIdMailjet")
            .then((email)=> {
              var event = req.body.event.charAt(0).toUpperCase() + + string.slice(1);
              email['dateMailjet' + event] = new Date().toISOString();
              email.status = req.body.event
              EmailBDD(email, "updateEmail")
                .then((email)=> {  res.sendStatus(200)})
                .catch((error)=> { res.sendStatus(200)});
            })
            .catch((error)=>{  return res.sendStatus(200)})
          }else{ res.sendStatus(200)}

})


module.exports = router;