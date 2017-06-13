
function EmailHandler(email){
  var apiKey = "e8ea3802545e22a1773e15f3abfa335b",
    apiSecret = "0d0425e4b5faf6235399ca28c4bc3ce7";

    var Mailjet = require('node-mailjet').connect(apiKey, apiSecret, {
      proxyUrl: process.env.https_proxy,
      timeout: 60000 // 1 minute
    });

    var sendEmail = Mailjet.post('send');

    var emailData = {
        'FromEmail': email.from,
        'FromName': email.name,
        'Subject': email.subject,
        'Text-part': email.text,
        'Recipients': email.recipients,
      'Attachments': [{
        "Content-Type": "text-plain",
        "Filename": "test.txt",
        "Content": email.html,
      }],
    }
    function handleData (data) {
      var returnValue = data.response.res.text
      var stringValue = JSON.parse(returnValue)
      var sentValue = stringValue.Sent[0];
      email.idMailjet = sentValue.MessageID;
      return email;

    }

    sendEmail
      .request(emailData).then(handleData)

}

module.exports = EmailHandler;
