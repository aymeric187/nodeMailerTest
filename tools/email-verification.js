function verifEntry(body){
  var isCorrect = false;
  if(typeof body.from === "undefined" || !body.from) {console.log("dz"); return isCorrect}
  else if(typeof body.name === "undefined" && body.name) {console.log("dz"); return isCorrect}
  else if(Object.prototype.toString.call( body.recipients ) != '[object Array]') return isCorrect;
  else if(typeof body.subject === "undefined") return isCorrect;
  else if(typeof body.text === "undefined") return isCorrect;
  else { isCorrect = true; console.log(body.name);return isCorrect }
}

function verifAdress(adress){
  var isCorrect = false;
      if(adress.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null)
      {
        isCorrect = true
      }else {
        isCorrect = false;
      }
      return isCorrect;
}

function verifAdresses(adresses){
    var isCorrect = false;
    if(adresses[0].Email  != null){
      var i = 0;
      do{
        isCorrect = verifAdress(adresses[i].Email);
        i++;
      }  while (i<adresses.length && isCorrect == null)
    }else{
      isCorrect = verifAdress(adresses);
    }
  return isCorrect;
}

function verifName(name){
    var isCorrect = false;
        if(name.match(/^[a-zA-Z -]+$/) != null)
        {
          isCorrect = true
        }else {
          isCorrect = false;
        }
  return isCorrect;
}

function EmailVerif(body){
  return verifEntry(body);
  //return verifAdresses(body.from);
  //return verifAdresses(body.recipients);
  //return verifName(body.name);
}

module.exports = EmailVerif;
