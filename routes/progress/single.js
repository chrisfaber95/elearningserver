const db = require('../../config/connection');

module.exports = (req, res) => {

    var sqlquery = "SELECT * FROM `allProgress` "
		sqlquery += "LEFT JOIN `User_canWatch` as uw on uw.`engineer` = `user_id` "
        sqlquery += "WHERE `user_id` = " + req.params.userId +" OR `company` = " + req.params.userId + ";";
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const progress = result;
        res.status(200).json({progress});
	})   
};
