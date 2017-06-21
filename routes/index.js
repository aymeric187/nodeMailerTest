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
    new Promise((resolve, reject) => { var email = new Email(req.body); resolve(email)
    })


      .then((email) =>{
        EmailBDD(email, "createEmail")




          .then((tada)=>{
            EmailHandler(email)

                  .then((email)=>{
                    if(email.hasOwnProperty("idMailjet")){
                      EmailUpdater((email), ["updateMessageStatus", "updateMessageDateSent"]).then((email)=> { return res.json(email)})
                    }
                  })
                  .catch((error)=> { return res.json(error) })
          })
          .catch((error)=> { return res.json(error) })
      })
      .catch((error)=> { return res.json(error) })


})

  //  res.json(EmailUpdater(EmailHandler(email), ["updateMessageStatus", "updateMessageDate"]));

router.get('/email-single', function(req, res) {
  EmailBDD(req.query._id, "getEmailByIdPost")
    .then((email)=> {
      return res.json(email)
    })
    .catch((error)=>{ res.json(error)})
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
    console.log('-- EVENT CATCHER')
    console.log("-- Requête IdMailjet : " + req.body.MessageID);
    console.log("-- Requête date : " + new Date(req.body.time).toISOString();
    console.log("-- Requête mail status : " + req.body.event;
    console.log("------")

    var paramUpdate = {}
    paramUpdate['idMailjet'] = req.body.MessageID;
    paramUpdate['dateMailjetOpened'] = req.body.time;
    paramUpdate['status'] = req.body.event;
    EmailBDD(req.query._id, "getEmailByIdPost")
      .then((email)=> {
        EmailBDD(email, "updateEmail")
          .then((email)=> { return res.sendStatus(200))
          .catch((error)=> res.sendStatus(200));
      })
      .catch((error)=>{ res.sendStatus(200)})
})


module.exports = router;
