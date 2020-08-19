const db = require('../../config/connection');

module.exports = (req, res) => {
    var sqlquery = "SELECT c.`certificate_id`, c.`filename`, c.`url`, c.`user_id`, c.`name` "
        sqlquery += "FROM `Certificate` as c "
		if(req.params.userId){
			sqlquery += "WHERE c.`user_id` = " + req.params.userId + " "
		}
		sqlquery += "; ";
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const cert = result;
        res.status(200).json({cert});
	})   
};

