const nodemailer = require('nodemailer');
const config = require("../config.json")
const smtpTransport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.email, // generated ethereal user
      pass:  config.password
    },
    tls: {
        rejectUnauthorized: false
    }
});


async function sendDynamicMail(to, subject, htmlSend){
    var mailOptions = {
        from: config.email,
        to : to,
        subject : subject,
        html : htmlSend
    };

    smtpTransport.sendMail(mailOptions,function (error, response) {
        if(response){
            return true;
        }
        if (error) {
           return error;
            //callback(error);
        }
    });
}

module.exports = {
    sendDynamicMail
}