const db = require('../../../config/connection');

module.exports = (req, res) => {
	console.log(req.params)
	var sqlquery = "DELETE FROM `Onderdeel` WHERE `onderdeel_id` = " + req.params.onderdeelId + ";";
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const training = "onderdeel deleted";
		res.status(200).json({training});
		})   
};
