const db = require('../../config/connection');

module.exports = (req, res) => {
	console.log(req.params)
	var sqlquery = "DELETE FROM `Training` WHERE `training_id` = " + req.params.trainingId + ";";
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const training = "training deleted";
		res.status(200).json({training});
		})   
};
