const referentions = require('express').Router();

const bodyParser = require('body-parser');
referentions.use(bodyParser.json({ limit: '50mb' }));
referentions.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000}));


console.log('accessing Information');
const all = require('./all');
const single = require('./single');
const remove = require('./delete');
const post = require('./post');
const update = require('./update');

referentions.get('/', all);
referentions.get('/:refId', single)
referentions.delete('/:refId', remove)
referentions.post('/', post)
referentions.put('/update/:refId', update)


module.exports = referentions;