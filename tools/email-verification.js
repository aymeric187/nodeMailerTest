
function EmailVerif(body){


  return new Promise((resolve, reject) => {
    var verify = {};
      verify['isCorrect'] = false;
      verify['message'] = " ";

    var foo = function () {}

    var fromArray = ["malek@agence187.com"]

    var action = {
      verifyEntry: function(){
        if(typeof body._id === "undefined" || !body._id) { verify.message = "_id incorrect"; return verify }
        else if(typeof body.from === "undefined" || !body.from) {  verify.message = "from incorrect"; return verify }
        else if(typeof body.name === "undefined" || !body.name) { verify.message = "name incorrect"; return verify }
        else if(typeof body.replyTo === "undefined" || !body.replyTo) { verify.message = "replyTo incorrect"; return verify }
        else if(Object.prototype.toString.call( body.recipients ) != '[object Array]') { verify.message = "recipients incorrect"; return verify }
        else if(!body.recipients[0].Email) { verify.message = "recipients incorrect"; return verify }
        else if(typeof body.subject === "undefined" || !body.subject) { verify.message = "subject incorrect"; return verify }
        else if(typeof body.html === "undefined" || !body.html) { verify.message = "html incorrect"; return verify }
        else if(typeof body.datePost === "undefined" || !body.datePost) { verify.message = "datePost incorrect"; return verify }
        else { verify.isCorrect = true}
      },

      verifyNoSqlInjection: function(){
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
      },

      verifyAdress: function(){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(this.emailToVerify))
            {
              verify.isCorrect = true
              verify.message = this.key+ " correct"
            }else {
              verify.isCorrect = false;
              verify.message = this.key+ " incorrect"
            }
      },


      verifyAdresses:function(){
            for (this.key in body) {
              if (this.key === "from"){
                for (var i = 0; i < fromArray.length; i++){
                  if(fromArray[i]!= body.from) {verify.isCorrect = false; verify.message = this.key + " incorrect"; return verify}
                }
              }
              else if(this.key === "replyTo"){
                this.emailToVerify = body[this.key];
                foo = action["verifyAdress"];
                foo();
                if (verify.isCorrect === false){return verify}
              }
              else if(this.key === "recipients"){
                  this.index = 0;
                  do{
                    this.emailToVerify = body.recipients[this.index].Email;
                    foo = action["verifyAdress"];
                    foo();
                    if (verify.isCorrect === false){return verify}
                    this.index++
                  }  while (this.index<body.recipients.length)
              }
            }
      },

      verifyName:function(){
              if(body.name.match(/^[a-zA-Z -]+$/) != null)
              {
                verify.isCorrect = true
                verify.message = " ";
              }else {
                verify.isCorrect = false;
                verify.message = "name incorrectly written"
              }
      }
    }


      foo = action["verifyEntry"];
      foo();
      if(verify.isCorrect){
        foo = action["verifyAdresses"];
        foo();
        if(verify.isCorrect){
          foo = action["verifyNoSqlInjection"];
          foo();
          if(verify.isCorrect){
            foo = action["verifyName"];
            foo();
            if(verify.isCorrect){
                  verify.message = "everything correct"
                  resolve(verify);
            }else reject(verify)
          }else reject(verify)
        }else reject(verify)
      }else reject(verify)
    });
}

module.exports = EmailVerif;
