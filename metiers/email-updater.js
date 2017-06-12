function EmailUpdater(emailID){
  // The following code calls the Mailjet API in order to get Status
      var apiKey = "e8ea3802545e22a1773e15f3abfa335b",
        apiSecret = "0d0425e4b5faf6235399ca28c4bc3ce7";

      const mailjet = require ('node-mailjet')
        .connect(apiKey, apiSecret, {
            'url': 'api.mailjet.com',
            'version': 'v3', //
            'secured': false, /
            'perform_api_call': true
        })

      var message = mailjet.get('message')

      function handleMessage (data) {
        var returnValue = data.response.res.text;
        var stringValue = JSON.parse(returnValue);
        console.log(stringValue.Data[0].Status);
      }

      message.request(emailID)
          .then(handleMessage)
          .catch(function (reason) {
            console.log(reason);
      })

      // The following code update the email stocked in database
}

module.exports = EmailUpdater;
