var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser');

var UserBDD = require('../metiers/user-bdd');
var CryptingHandler = require('../metiers/crypting-handler0');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var _ = require('lodash')


var Email = require('../models/email-model');
var EmailBDD = require('../metiers/email-bdd');
var EmailHandler = require('../metiers/email-handler');
var EmailVerif = require('../tools/email-verification');

var URLSearchParams = URLSearchParams || require('urlsearchparams').URLSearchParams;


/**
   * @swagger
   * definitions:
   *   Email:
   *     required:
   *       - _id
   *       - from
   *       - name
   *       - replyTo
   *       - recipients
   *       - subject
   *       - html
   *       - subject
   *       - datePost
   *     properties:
   *       _id:
   *         type: date-iso-string
   *         description: The _id of the client's email
   *       from:
   *         type: string
   *         description: The sender initialized in Mailjet API, will be displayed as sender in the email.
   *       name:
   *         type: string
   *         description: The name of the client's sender.
   *       replyTo:
   *         type: string
   *         description: The client sender 's email
   *       recipients:
   *         type: array
   *         description: "array of json, example: [{Email: \"nicolas@agence187.com\"}, {Email: \"gregory@agence187.com\"}]"
   *       subject:
   *         type: string
   *         description: The subject of the email
   *       html:
   *         type: string
   *         description: The content of the email
   *       date:
   *         type: object
   *         description: containing datePost (date from which the Post has been made), dateMailjetSent (date d'envoie de l'email) (if defined), dateMailjetOpen (date d'ouverture) (if defined)
   *       status:
   *         type: string
   *       idMailjet:
   *         type: string (int)
*/


/**
 * @swagger
 * /:
 *   get:
 *     description: Guide the user to the landing page of the API, in order to browse through documentation and user-guide
 *     produces:
 *       - Swagger IU Express web page.
 */
router.get('/', function(req, res, next) {
  res.render("index");
});


router.post('/authentification', function(req, res, next) {
  /*CryptingHandler(req.body.password).then((isCorrect)=>{
    var auth= {}
    auth['isCorrect'] = isCorrect
    res.json(auth)
  }).catch((error)=>{console.log(error); res.json(error)})
*/

});

//===============PASSPORT=================
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'nonmaisfautvraimentpasoublier';

var strategyJWT = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  UserBDD(jwt_payload.username, 'getUserByUsername').then((user)=>{
    next(null, true);
  })
  .catch((error)=>{console.log(error); next(null, false)})
});

passport.use(strategyJWT);

router.post('/login',function(req, res, next) {
            passport.authenticate('login-local',function(err, response, info){
              res.json(response)
})(req, res, next)
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('login-local', new LocalStrategy({usernameField: 'username', passwordField: 'password'},
  function(username, password, done) {
    console.log(username)
    console.log(password)
    console.log(CryptingHandler(password, "decryptSignature"))
      UserBDD(username, 'getUserByUsername').then((user)=>{

        if (!user) {
          console.log(username)
          var response = {}
          response['message'] = "no good, password or username incorrect"
          response['isAccepted'] = false
          return done(null, response);
        }
        else if (user.password != CryptingHandler(password, "decryptSignature")) {
          console.log(111)
          console.log(user.password)
          console.log(user)
          var response = {}
          response['message'] = "no good, password or username incorrect"
          response['isAccepted'] = false
          return done(null, response);
        }
        else{
          console.log(1111)
          var payload = {username: user.username, company: user.company};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          var response = {}
          response['token']= token
          response['message'] = "its all good"
          response['isAccepted'] = true
          return done(null, response);
        }
      })
      .catch((error)=>  {console.log(error); done(null, false, { message: error })})
  }
));


router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});


router.post("/secret",
  passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");

});


/**
   * @swagger
   * /send-email:
   *   post:
   *     description: Returns users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: _id
   *         type: date-iso-string
   *         required: true
   *         description: "This _id should be similar to the client's _id "
   *       - name: from
   *         type: string
   *         required: true
   *         description: "is the expeditor of the Mailjet API"
   *       - name: replyTo
   *         type: string
   *         required: true
   *         description: "is the person that send the email, do not confuse with from"
   *       - name: recipients
   *         type: array
   *         required: true
   *         description: "can handle multiple recipients, must be an array of json, example: [{Email: \"nicolas@agence187.com\"}, {Email: \"gregory@agence187.com\"}]"
   *       - name: subjects
   *         type: string
   *         required: true
   *         description: "subject of the email"
   *       - name: html
   *         type: string
   *         required: true
   *         description: "content of the email, it must be written in html form"
   *       - name: date
   *         type: object
   *         required: true
   *         description: "composed of datePost, dateMailjetSent (if defined), dateMailjetOpen (if defined)"

   *     responses:
   *       200:
   *         description: 'Email'
   *         type: object
   */

router.post('/send-email', passport.authenticate('jwt', { session: false }), function(req, res){
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


passport.use('register-local', new LocalStrategy({usernameField: 'username', passwordField: 'password', passReqToCallback: true},
     function(req, username, password, done) {
           apiPass = CryptingHandler(req.body.apiPass, "decryptSignature")
           console.log(apiPass)
           if (!CryptingHandler(apiPass, "verifyPassApi") ) {
             var response = {}
             response['message'] = "no good, password Api incorrect"
             response['isAccepted'] = false
             return done(null, response);
           }
           else{
             password = CryptingHandler(password, "decryptSignature")
             var user = {}
             user['email'] = req.body.email
             user['username'] = username
             user['password'] = password
             user['company'] = req.body.company
             user['firstName'] = req.body.firstName
             user['lastName'] = req.body.lastName
              UserBDD(user, "createUser").then((user)=>{
                var response = {}
                response['message'] = "its all good"
                response['isAccepted'] = true
                response['user'] = user
                return done(null, response);
              })
              .catch((error)=>  {console.log(error); done(null, false, { message: error })})
           }
}))


router.post('/register-user', function(req, res, next) {
            passport.authenticate('register-local',function(err, response, info){
              res.json(response)
})(req, res, next)
});


/**
 * @swagger
 * /email-single:
 *   post:
 *     description: Return an email corresponding to the _id (the one that was sent during post send-email)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: "This _id should be similar to the client's _id"
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 'Email'
 *         type: object
 */
router.get('/email-single',  passport.authenticate('jwt', { session: false }), function(req, res){
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> {  email._rev = undefined; res.json(email)}).catch((error)=>{ res.json(error)})
});

/**
 * @swagger
 * /email-list:
 *   post:
 *     description: Return an array of email corresponding to the sender's email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: "a standard email"
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "Array of Email"
 *         type: array
 */
router.get('/email-list', passport.authenticate('jwt', { session: false }), function(req, res){
  EmailBDD(req.query.email, "getEmailByUserEmail").then((emailArray)=> { res.json(emailArray) }).catch((error)=> { res.json(error)})
});

/**
 * @swagger
 * /email-status:
 *   post:
 *     description: "Return the status of an email (unsent, sent, open) corresponding to the _id (the one that was sent during post send-email)"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: "This _id should be similar to the client's _id"
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "status of the requested either unsent, sent, or open."
 *         type: string
 */
router.get('/email-status', passport.authenticate('jwt', { session: false }), function(req, res){
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> { res.json(email.status) }).catch((error)=>{ res.json(error)})
});

/**
 * @swagger
 * /email-dateMailjet:
 *   post:
 *     description: "With the _id, this functions search for all the dates of the corresponding email and status"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: "This _id should be similar to the client's _id"
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "object date inside Email (cf: Email Model)"
 *         type: object
 */
router.get('/email-dateMailjet', passport.authenticate('jwt', { session: false }), function(req, res){
  EmailBDD(req.query._id, "getEmailByIdPost").then((email)=> {
    var date = {}
    date['datePost']=email.datePost
    date['dateMailjetSent']=email.dateMailjetSent
    date['dateMailjetOpen']=email.dateMailjetOpen

    res.json(date)

  }).catch((error)=>{ res.json(error)})
});

/**
 * @swagger
 * /email-event-catcher:
 *   post:
 *     description: Change status of an email, and set up corresponding date by catching the event sent by API Mailjet defined at \"https://app.mailjet.com/account/triggers\.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idMailjet
 *         description: "This is the API Mailjet's corresponding id"
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: "status 200, expected by API Mailjet"
 */
router.post('/email-event-catcher', function(req,res){

          idMailjet = req.body.MessageID.toString()
          if(idMailjet && req.body.time && req.body.event){
          EmailBDD(idMailjet, "getEmailByIdMailjet")
            .then((email)=> {
              var event = req.body.event.charAt(0).toUpperCase() + req.body.event.slice(1);
              email['dateMailjet' + event] = new Date().toISOString();
              email.status = req.body.event
              EmailBDD(email, "updateEmail")
                .then((email)=> { res.sendStatus(200)})
                .catch((error)=> { res.sendStatus(200)});
            })
            .catch((error)=>{  return res.sendStatus(200)})
          }else{  res.sendStatus(200)}

})

module.exports = router;
