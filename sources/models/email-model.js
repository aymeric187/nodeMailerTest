var EmailVerif = require('../tools/email-verification');

'use strict';

/**
 * Represents an email .
 * @constructor
 * @param {string} _id -  The _id of the client's email
 * @param {string} from - The sender initialized in Mailjet API, will be displayed as sender in the email.
 * @param {string} name - The name of the client's sender.
 * @param {string} replyTo - The client sender 's email
 * @param {string} recipients - The recipients, array of json, example: [{Email: \"nicolas@agence187.com\"}, {Email: \"gregory@agence187.com\"}]
 * @param {string} subject - The subject of the email
 * @param {string} html - The content of the email
 * @param {string} datePost - date from which the Post has been made
 */

function Email(body) {
  EmailVerif(body).then((verify)=>{
    if(verify.isCorrect){
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
      this.dateMailjetOpen = undefined;
    }else{
      throw verify.message;
    }
  }).catch((error)=> {return (error)})
};


module.exports = Email;
