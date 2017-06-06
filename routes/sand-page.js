var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})); // handle the route at yourdomain.com/sayHello


function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aymeric@agence187.com', // Your email id
            pass: 'taf,1234' // Your password
        }
    });

    var mailOptions = {
    from: 'example@gmail.com>', // sender address
    to: 'aymeric@agence187.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: "text" //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
        };
    });
}

module.exports = router;
