const translate = require('express').Router();
//console.log( __dirname )
const multer = require("multer")
const path = require('path')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var storage2 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/translate');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({
	storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.csv') {
            return callback(new Error('Only CSV are allowed'))
        }
        callback(null, true)
    },
	limits:{
		fileSize: 5000000
	}
})
const upload2 = multer({
	storage: storage2,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.csv') {
            return callback(new Error('Only CSV are allowed'))
        }
        callback(null, true)
    },
	limits:{
		fileSize: 5000000
	}
})

function fileUpload(req, res, next) {
  upload.single('file')(req, res, next);
  upload2.single('file')(req, res, next);
  next();
}

console.log('accessing Information');
const all = require('./all');
const single = require('./single');
//const remove = require('./delete');
//const post = require('./post');
const update = require('./update');

translate.get('/', all);
translate.get('/file', single);
//question.get('/single/:questionId', single)
//question.get('/single/:questionId/:type', single)
//question.delete('/:questionId', remove)
//question.post('/', post)
translate.put('/', fileUpload, update)


module.exports = translate;