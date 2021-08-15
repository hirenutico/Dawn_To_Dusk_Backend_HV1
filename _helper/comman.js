
function setResData(status,code ,data ,message){
    const res = {
        Status:status,
        Code:code,
        Data:data,
        message:message
    }
    return res
}
module.exports = {
    setResData,
};
  