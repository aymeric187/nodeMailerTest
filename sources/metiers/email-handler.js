function EmailHandler(email){

  return new Promise((resolve, reject) => {
      var apiKey = "583ff8d18c721819dcf481c373550349",
        apiSecret = "565a5c9bfdded48826d45fc17e02d74f";

        var Mailjet = require('node-mailjet').connect(apiKey, apiSecret, {
          proxyUrl: process.env.https_proxy,
          timeout: 60000 // 1 minute
        });

        var sendEmail = Mailjet.post('send');

        var emailData = {
            'FromEmail': email.from,
            'FromName': email.name,
            'Subject': email.subject,
            'Html-part': email.html,
            'Recipients': email.recipients,"Headers": {"Reply-To":email.replyTo}

        }
        function handleData (data) {


          var returnValue = data.response.res.text
          var stringValue = JSON.parse(returnValue)
          email.idMailjet = JSON.stringify(stringValue.Sent[0].MessageID).replace('"',"").replace('"',"");
          console.log(email);
          resolve(email);

        }

        sendEmail
          .request(emailData).then(handleData).catch((error)=> reject(error))


    })

}

module.exports = EmailHandler;
