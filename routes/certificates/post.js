const db = require('../../config/connection');
const multer = require("multer")

module.exports = (req, res) => {
	console.log(req.body.name)
	console.log(req.file)
	var path = req.file.path
	path = path.replace("public/", "");
    var sqlquery = "INSERT INTO `Certificate` (`user_id`, `filename`, `url`, `name`) "
		sqlquery += "VALUES ('"+req.params.userId+"', "+db.connection.escape(req.file.filename)+", "+db.connection.escape(path)+", "+db.connection.escape(req.body.name)+"); "
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		//const progress = "test"
		const cert = result;
        res.status(200).json({cert});
	})   
};
