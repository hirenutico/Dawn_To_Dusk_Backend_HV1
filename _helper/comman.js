
function setResData(status, code ,data ,message){
    const res = {
        status:status,
        code:code,
        data:data,
        message:message
    }
    return res
}
module.exports = {
    setResData,
};
  