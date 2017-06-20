var EmailVerif = require('../tools/email-verification');

'use strict';


function Email(body) {
  EmailVerif(body).then((verify)=>{
    if(true){
      this._id = body._id;
      if (typeof body.idMailjet === "undefined") {this.idMailjet = undefined} else {this.idMailjet = body.idMailjet};
      this.from = body.from
      this.name = body.name;
      this.replyTo = body.replyTo;
      this.recipients = body.recipients;
      this.subject = body.subject;
      this.html = body.html;
      this.status = "unsent";
      this.datePost = body.datePost;
      this.dateMailjetSent = undefined;
      this.dateMailjetOpened = undefined;
    }else{
      throw verify.message;
    }
  }).catch((error)=> {throw console.log(error)})

};


module.exports = Email;
