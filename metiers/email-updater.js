var EmailBDD = require('../metiers/email-bdd');

function EmailUpdater(email, updateType){

  return new Promise((resolve, reject) => {


      var foo = function () {}

  // The following code calls the Mailjet API in order to get Status
      var apiKey = "583ff8d18c721819dcf481c373550349",
        apiSecret = "565a5c9bfdded48826d45fc17e02d74f";

      const mailjet = require ('node-mailjet')
        .connect(apiKey, apiSecret, {
            'url': 'api.mailjet.com',
            'version': 'v3',
            'secured': false,
            'perform_api_call': true
        })

      var message = mailjet.get('message')

      function Example (fn, payload) {
          this.fn = fn
          this.payload = payload
          this.format = function (obj) { return JSON.stringify(obj).match(/\S+/g).join('') }
          this.call = function () {
            var res = this.fn.request(this.payload)
            var ret = res[0] + ' ' + this.format(res[1])
            return ret
      }
    }

      new Example(message.id(email.id))

      message.request(email.idMailjet).then((data)=>{
        var update = {
            updateMessageStatus: function () {
              var returnValue = data.response.res.text;
              var stringValue = JSON.parse(returnValue);
              if (!stringValue.Data[0]){ reject([{message: "wrong parameters for API mailjet"}, {email: email}])}
              else{email.status = stringValue.Data[0].Status; console.log(email.status)}
            },

            updateMessageDateSent: function () {
              var returnValue = data.response.res.text;
              var stringValue = JSON.parse(returnValue);
              console.log("ReturnValue date " + returnValue)

              if (!stringValue.Data[0]){ reject([{message: "wrong parameters for API mailjet"}, {email: email}])}
              else{email.dateMailjetSent = stringValue.Data[0].ArrivedAt}
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
