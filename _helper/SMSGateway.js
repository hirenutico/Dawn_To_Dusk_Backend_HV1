const nodemailer = require('nodemailer');
const config = require("../config.json");
const https = require('https');
var Axios = require('axios');
const { get } = require('http');

async function SendFactoryOTP(to_phone, OTP) {
    var host = "/API/V1/" + config['2Factory_API_Key'] + "/SMS/" + to_phone + "/" + OTP + "/D2D"
    console.log(host)

    var headers = {
        "Content-Type": "application/json"
      };

    const options = {
        hostname: "https://2factor.in",
        path: host,
        headers: headers,
        method: 'GET'
    }

    const req = https.get(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
    console.error(error)
    })

    req.end()
}

module.exports = {
    SendFactoryOTP
}