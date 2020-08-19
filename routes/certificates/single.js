const db = require('../../config/connection');

module.exports = (req, res) => {
   
    var sqlquery = "SELECT c.`certificate_id`, c.`filename`, c.`url`, c.`user_id`, c.`name` "
        sqlquery += "FROM `Certificate` as c "
		sqlquery += "WHERE c.`certificate_id` = " + req.params.certId + " "
		sqlquery += "; ";
		console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		console.log(result);
		const cert = result;
        res.status(200).json({cert});
	})   
};

