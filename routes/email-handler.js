var nodemailer = require('nodemailer');

function EmailHandler(email) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aymeric@agence187.com', // Your email id
            pass: 'taf,1234' // Your password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: email.from, // sender address
        to: email.to, // list of receivers
        subject: email.subject, // Subject line
        text: email.text, // plain text body
        html: email.html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return error;
        }
            return info;
    });

    transporter.close();
}


module.exports = EmailHandler;
