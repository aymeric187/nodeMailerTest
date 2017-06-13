'use strict';


function Email(body) {
  this.idBeforePost = body.idBeforePost;
  this.idMailjet = "nonDefini";
  this.from = body.from;
  this.name = body.name;
  this.recipients = body.recipients;
  this.subject = body.subject;
  this.text = body.text;
  this.html = body.html;
  this.status = "unsent";
};


module.exports = Email;
