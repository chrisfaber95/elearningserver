const training = require('express').Router();

const bodyParser = require('body-parser');
training.use(bodyParser.urlencoded({ extended:  true }));
training.use(bodyParser.json());
console.log('accessing training');

const all = require('./all');
const single = require('./single');
const post = require('./post');
const update = require('./update');
const remove = require('./remove');

const onderdeel = require('./onderdeel')
training.use('/onderdeel', onderdeel)

const subonderdeel = require('./subonderdeel')
training.use('/subonderdeel', subonderdeel)


training.get('/', all);
training.get('/user/:userId', all)
training.get('/:trainingId', single)
training.post('/', post)
training.put('/user/:userId', update);
training.delete('/:trainingId', remove);


module.exports = training;