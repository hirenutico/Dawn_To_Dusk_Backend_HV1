
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helper/jwt');
const errorHandler = require('./_helper/errorhandler');
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());
// use JWT auth to secure the api
app.use(jwt());

app.use('/api/user' ,require('./src/Auth/AuthController'))

// global error handler
                                                                                                                                                  
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) :  5000;
const serverDomain = '10.12.12.156';
// app.listen(port, serverDomain);
const server = app.listen(port, function () {
    console.log(`Server listening on Server: ${serverDomain} and port ${port}`);
});

// Web Interface                 http://127.0.0.1:4040                                              
// Forwarding                    http://7735a6d924bb.ngrok.io -> http://localhost:5000              
// Forwarding                    https://7735a6d924bb.ngrok.io -> http://localhost:5000    