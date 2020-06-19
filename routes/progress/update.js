const db = require('../../config/connection');
module.exports = (req, res) => {
    var sqlquery = "UPDATE `User_Subonderdeel` SET `isFinished`= '1' WHERE `user_id`= " + req.params.userId + " AND `subonderdeel_id`= " + req.body.subId + ";"
    db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		console.log(result);
		const user = result;
		res.status(200).json({user});
	})   
}