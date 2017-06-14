'use strict';


function Email(body) {
  this._id = "1";
  this.idMailjet = undefined;
  this.from = body.from;
  this.name = body.name;
  this.recipients = body.recipients;
  this.subject = body.subject;
  this.text = body.text;
  this.html = body.html;
  this.status = "unsent";
  this.datePOST = new Date();
  this.dateMailjet = "tadada";
};


module.exports = Email;
