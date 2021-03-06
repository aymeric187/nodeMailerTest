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
            var emailAPI = EmailHandler(email)

                  emailAPI.then((email)=>{
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

router.post('/email-event-catcher', function(req,res){
/*  for (var i =0; i< req.body.length; i++){
    var paramUpdate = {}
    paramUpdate['MessageID'] = req.body[i].MessageID;
    paramUpdate['dateMailjetOpened'] = new date(req.body[i].time);
    paramUpdate['status'] = req.body[i].event;
    var emailBDD = EmailBDD(paramUpdate, "updateEmail").catch((error)=>{console.log(error)});

  }

  return res.sendStatus(200)*/
})


module.exports = router;
