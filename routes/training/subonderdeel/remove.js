const db = require('../../../config/connection');

module.exports = (req, res) => {
	console.log(req.params)
	var sqlquery = "DELETE FROM `Subonderdeel` WHERE `subonderdeel_id` = " + req.params.subId + ";";
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const training = "subonderdeel deleted";
		res.status(200).json({training});
		})   
};
