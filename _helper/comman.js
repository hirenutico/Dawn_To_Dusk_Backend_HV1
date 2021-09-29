
function setResData(status, code ,data ,message){
    const res = {
        status:status,
        code:code,
        data:data,
        message:message
    }
    return res
}

function RandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = {
    setResData,
    RandomString,
};
  