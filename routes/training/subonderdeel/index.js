const onderdeel = require('express').Router({mergeParams: true});
console.log('accessing training');
const all = require('./all');
const single = require('./single');
const post = require('./post');
//const update = require('./update');
const remove = require('./remove');


onderdeel.get('/:subId', all);
onderdeel.get('/single/:subId/user/:userId', single)
onderdeel.post('/:trainingId', post)
//onderdeel.put('/', update);
onderdeel.delete('/:subId', remove);


module.exports = onderdeel;