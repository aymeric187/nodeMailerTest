'use strict';


function Email(body) {
  this._id = body._id;
  if (typeof body.idMailjet === "undefined") {this.idMailjet = undefined} else {this.idMailjet = body.idMailjet};
  this.replyTo = body.replyTo;
  this.from = body.from
  this.name = body.name;
  this.recipients = body.recipients;
  this.subject = body.subject;
  this.text = body.text;
  this.html = body.html;
  this.status = "unsent";
  this.datePOST = body.post;
  this.dateMailjet = "tadada";
};


module.exports = Email;
