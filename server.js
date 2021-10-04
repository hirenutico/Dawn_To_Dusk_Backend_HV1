
const express = require('express');
const http = require('http');
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
app.use('/api/address' ,require('./src/Address/AddressController'))
app.use('/api/category' ,require('./src/Categories/CategoriesController'))

// global error handler
                                                                                                                                                  
app.use(errorHandler);
app.use(cors())

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) :  5000;
// const hostname = '127.0.0.1';
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('NodeJS server running on Shared Hosting\n');
// });
  
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

const server = app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
}); 