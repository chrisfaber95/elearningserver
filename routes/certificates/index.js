const certificate = require('express').Router();

const bodyParser = require('body-parser');
certificate.use(bodyParser.json({ limit: '50mb' }));
certificate.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000}));

const multer = require("multer")
const path = require('path')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
     },
    filename: function (req, file, cb) {
        cb(null , new Date().toISOString() + file.originalname);
    }
});

const upload = multer({
	storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.pdf') {
            return callback(new Error('Only PDF are allowed'))
        }
        callback(null, true)
    },
	limits:{
		fileSize: 5000000
	}
})

console.log('accessing certificate');
const all = require('./all');
const single = require('./single');
const remove = require('./delete');
const post = require('./post');
const update = require('./update');

certificate.get('/', all);
certificate.get('/user/:userId', all);
certificate.get('/single/:certId', single)
certificate.delete('/:certId', remove)
certificate.post('/:userId', upload.single('file'), post)
certificate.put('/:certId', update)


module.exports = certificate;