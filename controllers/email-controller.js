var Email = require('../models/email-model');
var EmailHandler = require('../routes/email-handler');

'use strict';

exports.sendEmail = function(req, res) {
  res.json(new EmailHandler(new Email(req.body)));
};
