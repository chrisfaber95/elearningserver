const information = require('express').Router();

const bodyParser = require('body-parser');
information.use(bodyParser.json({ limit: '50mb' }));
information.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000}));


console.log('accessing Information');
const all = require('./all');
const single = require('./single');
const remove = require('./delete');
const post = require('./post');
const update = require('./update');

information.get('/', all);
information.get('/:subId', single)
information.delete('/:infoId', remove)
information.post('/post', post)
information.put('/update/:infoId', update)


module.exports = information;