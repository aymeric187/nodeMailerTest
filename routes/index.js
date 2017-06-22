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
    new Promise((resolve, reject) => { console.log(1); var email = new Email(req.body); resolve(email)
    })


      .then((email) =>{
        console.log(2)
        EmailBDD(email, "createEmail")




          .then((email)=>{
            console.log(3)

            EmailHandler(email)

                  .then((email)=>{
                    console.log(4)
                    console.log(email)
                    EmailBDD(email, "updateEmail").then((email)=> {     console.log(new Date()); console.log(email); return res.json(email)})
                    /*
                    if(email.hasOwnProperty("idMailjet")){
                      console.log(5)
                      EmailUpdater((email), ["updateMessageStatus", "updateMessageDateSent"]).then((email)=> { console.log(email); return res.json(email)})
                    }
                    */
                  })
                  .catch((error)=> { return res.json(error) })
          })
          .catch((error)=> { return res.json(error) })
      })
      .catch((error)=> { return res.json(error) })


})

  //  res.json(EmailUpdater(EmailHandler(email), ["updateMessageStatus", "updateMessageDate"]));

router.get('/email-single', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email)}).catch((error)=>{ res.json(error)})
});

router.get('/setIndex', function(req, res) {
  EmailBDD(" ", "setIndex").then((email)=> { res.json(email)}).catch((error)=>{ res.json(error)})
});

router.get('/email-idMailjet', function(req, res) {
  EmailBDD(req.query.idMailjet, "getEmailByIdMailjet").then((email)=> { console.log(email); res.json(email)}).catch((error)=>{ res.json(error)})
});

router.get('/email-list', function(req, res) {
  EmailBDD(req.query.email, "getEmailByUserEmail").then((email)=> { res.json(email) }).catch((error)=> { res.json(error)})
});

router.get('/email-status', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email.status) }).catch((error)=>{ res.json(error)})
});

router.get('/email-dateMailjet', function(req, res) {
  EmailBDD(req.body.email, "getEmailByIdPost").then((email)=> { res.json(email.dateMailjet) }).catch((error)=>{ res.json(error)})
});


router.post('/email-event-catcher', function(req,res){
    console.log(new Date());
    console.log('-- EVENT CATCHER')
    console.log("-- Requête IdMailjet : " + req.body.MessageID);
    console.log("-- Requête date : " + req.body.time);
    console.log("-- Requête mail status : " + req.body.event);
    console.log("------")
    function resolveAfter2Seconds(x) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(x);
        }, 2000);
      });
    }
 function f1() {
      var x = await resolveAfter2Seconds(10);
      if(req.body.MessageID && req.body.time && req.body.event){
      EmailBDD(req.body.MessageID, "getEmailByIdMailjet")
        .then((email)=> {
          email.dateMailjetOpened = req.body.time
          email.status = req.body.event
          console.log(email)
          EmailBDD(email, "updateEmail")
            .then((email)=> { console.log(2); console.log(email); res.sendStatus(200)})
            .catch((error)=> { console.log(2); console.log(error); res.sendStatus(200)});
        })
        .catch((error)=>{ console.log(1);console.log(error); return res.sendStatus(200)})
      }else{ res.sendStatus(200)}



}

f1();


})


module.exports = router;
