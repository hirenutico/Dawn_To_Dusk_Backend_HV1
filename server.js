
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helper/jwt');
const errorHandler = require('./_helper/errorhandler');
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/api/user' ,require('./src/Auth/AuthController'))
app.use('/api/menu' ,require('./src/Menus/MenuController'))

// global error handler
                                                                                                                                                  
app.use(errorHandler);
app.use(cors())

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) :  5000;
const serverDomain = '10.12.12.156';
// app.listen(port, serverDomain);
const server = app.listen(port, function () {
    // console.log(`Server listening on Server: ${serverDomain} and port ${port}`);
    console.log(`Server listening on port ${port}`);
}); 