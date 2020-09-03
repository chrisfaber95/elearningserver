const user = require('express').Router();

const bodyParser = require('body-parser');
user.use(bodyParser.urlencoded({ extended:  true }));
user.use(bodyParser.json());

console.log('accessing Users');
const all = require('./all');
const single = require('./single');
const login = require('./login')
const register = require('./register')
const update = require('./update')
const add = require('./add')
const forget = require('./forget')
const remove = require('./delete')

user.get('/', all);
user.get('/:userId', single)
user.post('/login', login)
user.post('/register', register)
user.post('/', add)
user.put('/update/:userId', update)
user.put('/forget', forget)
user.delete('/:userId', remove)

module.exports = user;