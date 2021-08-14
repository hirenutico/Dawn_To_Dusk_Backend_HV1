
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
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});