var EmailBDD = require('../metiers/email-bdd');

function EmailUpdater(email, updateType){

  return new Promise((resolve, reject) => {


      var foo = function () {}

  // The following code calls the Mailjet API in order to get Status
      var apiKey = "e8ea3802545e22a1773e15f3abfa335b",
        apiSecret = "0d0425e4b5faf6235399ca28c4bc3ce7";

      const mailjet = require ('node-mailjet')
        .connect(apiKey, apiSecret, {
            'url': 'api.mailjet.com',
            'version': 'v3',
            'secured': false,
            'perform_api_call': true
        })

      var message = mailjet.get('message')

      message.request(email.idMailjet).then((data)=>{
        var update = {
            updateMessageStatus: function () {
              var returnValue = data.response.res.text;
              var stringValue = JSON.parse(returnValue);
              email.status = stringValue.Data[0].Status;
            },

            updateMessageDateSent: function () {
              var returnValue = data.response.res.text;
              var stringValue = JSON.parse(returnValue);
              email.dateMailjetSent = stringValue.Data[0].ArrivedAt;
            },

            update: function () {
              EmailBDD(email, "updateEmail");
            },
        }

          for(var i=0; i<updateType.length; i++){
            foo = update[updateType[i]];
            console.log(foo);
            foo();
          }
          foo = update["update"];
          foo();
          resolve(email);
      })
      .catch(function (reason) {
        console.log(reason);
  })

})


}

module.exports = EmailUpdater;
