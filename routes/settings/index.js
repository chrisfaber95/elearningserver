const settings = require('express').Router();

const bodyParser = require('body-parser');
settings.use(bodyParser.urlencoded({ extended:  true }));
settings.use(bodyParser.json());

console.log('accessing Information');
const rights = require('./rights');
const language = require('./language');
const db = require('./db');

settings.get('/rights', rights)
settings.get('/language', language)
settings.get('/db', db)


module.exports = settings;