var verify = {};
  verify['isCorrect'] = false;
  verify['message'] = " ";

function verifyEntry(body){
  if(typeof body._id === "undefined" || !body._id) { verify.message = "_id incorrect"; return verify }
  else if(typeof body.from === "undefined" || !body.from) {  verify.message = "from incorrect"; return verify }
  else if(typeof body.name === "undefined" || !body.name) { verify.message = "name incorrect"; return verify }
  else if(typeof body.replyTo === "undefined" || !body.replyTo) { verify.message = "replyTo incorrect"; return verify }
  else if(Object.prototype.toString.call( body.recipients ) != '[object Array]') { verify.message = "recipients incorrect"; return verify }
  else if(!body.recipients[0].Email) { verify.message = "recipients incorrect"; return verify }
  else if(typeof body.subject === "undefined" || !body.subject) { verify.message = "subject incorrect"; return verify }
  else if(typeof body.html === "undefined" || !body.html) { verify.message = "html incorrect"; return verify }
  else if(typeof body.post === "undefined" || !body.post) { verify.message = "datePost incorrect"; return verify }
  else { verify.isCorrect = true ;return verify }
}

function verifyNoSqlInjection(body){
    verify.message = "possible noSql injection"
    for (var key in body) {
  // skip loop if the property is from prototype

      var res = JSON.stringify(body[key]).match(/\$gt/gi);
      if(res != null){ verify.isCorrect = false; return verify }
      else{
        res = JSON.stringify(body[key]).match(/\$ne/gi)
        if(res != null){ verify.isCorrect = false; return verify }
        else{
          res = JSON.stringify(body[key]).match(/\$where/gi)
          if(res != null){ verify.isCorrect = false; return verify }
        }
      }
    }
    verify.message = " ";
    return verify;
}

function verifyAdress(adress){
  var isCorrect = false;
      if(adress.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null)
      {
        isCorrect = true
        verify.message = "recipients correct"
      }else {
        isCorrect = false;
        verify.message = "recipients incorrect"
      }
      return isCorrect;
}

function verifyAdresses(adresses){
      var i = 0;
      do{
        verify.isCorrect = verifyAdress(adresses[i].Email);
        i++;
      }  while (i<adresses.length && verify.isCorrect === true)

  return verify;
}

function verifyName(name){
        if(name.match(/^[a-zA-Z -]+$/) != null)
        {
          verify.isCorrect = true
          verify.message = " ";
        }else {
          verify.isCorrect = false;
          verify.message = "name incorrectly written"
        }
  return verify;
}

function EmailVerif(body){
  verify = verifyEntry(body);
  if(verify.isCorrect){
    verify = verifyAdresses(body.recipients)
    if(verify.isCorrect){
      verify = verifyNoSqlInjection(body)
      if(verify.isCorrect){
        verify = verifyName(body.name)
        if(verify.isCorrect){
              verify.message = "everything correct"
              return verify;
        }
      }else return verify
    }else return verify
  }else return verify;
  //return verifAdresses(body.from);
  //return verifAdresses(body.recipients);
  //return verifName(body.name);
  //return true;
}

module.exports = EmailVerif;
