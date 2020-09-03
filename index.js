require('dotenv').config();
const express = require('express');
const https = require('https');
const routes = require('./routes');
const app = express();
const moment = require('moment');
const multer = require('multer');
const path = require('path')
const fs = require("fs");
const csv = require('fast-csv');
const mysql = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(process.env.FILE_URL,express.static(__dirname + '/public'));
app.use(process.env.SERVER_URL, routes);
const  port  =  process.env.PORT  ||  3000;
//const  server  =  app.listen(port, () => {
//    console.log('Server listening at http://10.83.16.142:'  +  port);
//}); 


https.createServer({
    key: fs.readFileSync(path.resolve('./key.pem')),
    cert: fs.readFileSync(path.resolve('./cert.pem')),
	passphrase: process.env.CERT_PASS
}, app)
.listen(port);
//app.listen(3000, () => console.log('listening at port 3000'));
