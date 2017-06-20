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
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { email._rev = undefined; return res.json(email)}).catch((error)=>{ res.json(error)})
});

router.get('/email-list', function(req, res) {
  var emailBDD = EmailBDD(req.query.email, "getEmailByUserEmail").then((email)=> { res.json(email) }).catch((error)=> { res.json(error)})
});

router.get('/email-status', function(req, res) {
  var emailBDD = EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email.status) }).catch((error)=>{ res.json(error)})
});

router.get('/email-dateMailjet', function(req, res) {
  var emailBDD = EmailBDD(req.body.email, "getEmailByIdPost").then((email)=> { res.json(email.dateMailjet) }).catch((error)=>{ res.json(error)})
});

router.get('/email-up', function(req, res) {
  EmailUpdater(req.body, ["updateMessageStatus", "updateMessageDateSent"]).then((email)=> { return res.json(email)})
});

router.post('/email-event-catcher', function(req,res){
    console.log(req.body)
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx" + req.body.MessageID)
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx" + req.body.time)
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx" + req.body.event)
    console.log(new date(req.body.time));


    var paramUpdate = {}
    paramUpdate['MessageID'] = req.body.MessageID;
    paramUpdate['dateMailjetOpened'] = new date(req.body.time);
    paramUpdate['status'] = req.body.event;
    EmailBDD(paramUpdate, "updateEmail").catch((error)=> { console.log(error)})
      .then((email)=>{ EmailHandler({
            _id: new Date(),
          from:"aymeric@agence187.com",
          name: "Aymeric",
          replyTo:"aymeric@agence187.com",
          recipients:[{Email: "aymeric@agence187.com"}],
          subject:"notification de lecture",
          html:"notification de lecture" + "param : " + JSON.stringify(paramUpdate)
      }).then( function(){ return res.sendStatus(200)})
    })
     .catch((error)=>{EmailHandler({
           _id: new Date(),
         from:"aymeric@agence187.com",
         name: "Aymeric",
         replyTo:"aymeric@agence187.com",
         recipients:[{Email: "aymeric@agence187.com"}],
         subject:"notification de lecture",
         html:"notification de lecture" + "erreor : " + JSON.stringify(error)
  })
})
})


module.exports = router;
