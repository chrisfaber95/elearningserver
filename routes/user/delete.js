const db = require('../../config/connection');

module.exports = (req, res) => {
	console.log(req.params)
	var sqlquery = "DELETE FROM `User` WHERE `user_id` = " + req.params.userId + ";";
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const user = "Gebruiker deleted";
		res.status(200).json({user});
		})   
};
