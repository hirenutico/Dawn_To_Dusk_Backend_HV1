const nodemailer = require('nodemailer');
const config = require("../config.json");
const https = require('https');
var Axios = require('axios');
const { get } = require('http');
const { BADHINTS } = require('dns');
const { channel } = require('diagnostics_channel');

 const SendFactoryOTP = async (to_phone, OTP, message) => {
    var host = "https://2factor.in/API/V1/" + config['2Factory_API_Key'] + "/SMS/" + to_phone + "/" + OTP + "/D2D"
    console.log(host)

    var headers = {
        "Content-Type": "application/json"
      };
    Axios({
        method: "GET",
        url: host,
        headers: headers
    }).then(res => {
        console.log(res.data)
        if (res.data.Status === "Success") {
            console.log("success")
            return true
        }
        else {
            console.log("faild")
            return false
        }
    }).catch(err => {
        console.log('error', err)
        return false
    })
}

module.exports = {
    SendFactoryOTP
}