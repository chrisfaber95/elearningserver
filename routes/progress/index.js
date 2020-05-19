const user = require('express').Router();

const bodyParser = require('body-parser');
user.use(bodyParser.urlencoded({ extended:  true }));
user.use(bodyParser.json());

console.log('accessing Progress');
const all = require('./all');
const single = require('./single');
const update = require('./update')

user.get('/', all);
user.get('/:userId', single)
user.put('/update/:usesrId', update)

module.exports = user;