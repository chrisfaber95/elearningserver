const routes = require('express').Router();

const training = require('./training');
routes.use('/training', training);

const user = require('./user');
routes.use('/user', user);

const message = require('./messages');
routes.use('/message', message);

const information = require('./information');
routes.use('/information', information);

const progress = require('./progress');
routes.use('/progress', progress);

const settings = require('./settings');
routes.use('/settings', settings);

const questions = require('./questions');
routes.use('/questions', questions);

const referentions = require('./referentions');
routes.use('/referentions', referentions);

const certificates = require('./certificates');
routes.use('/certificates', certificates);

const translation = require('./translation');
routes.use('/translation', translation);


routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected'
    })
});

module.exports = routes;