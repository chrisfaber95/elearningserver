const question = require('express').Router();

const bodyParser = require('body-parser');
question.use(bodyParser.urlencoded({ extended:  true }));
question.use(bodyParser.json());

console.log('accessing Information');
const all = require('./all');
const single = require('./single');
const remove = require('./delete');
const post = require('./post');
const update = require('./update');

question.get('/', all);
question.get('/:subId', all);
question.get('/single/:questionId', single)
question.get('/single/:questionId/:type', single)
question.delete('/:questionId', remove)
question.post('/', post)
question.put('/:questionId', update)


module.exports = question;