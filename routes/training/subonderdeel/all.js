const db = require('../../../config/connection');

module.exports = (req, res) => {

    var sqlquery = "SELECT `allTrainingen`.*, `i`.`text`, `i`.`information_id`, `i`.`page`, `i`.`difficulty` as `iDifficulty` FROM `bollegraafdb`.`allTrainingen` "
        sqlquery += "LEFT JOIN `Information` as `i` using(subonderdeel_id) "
        sqlquery += "WHERE `subonderdeel_id` = " + req.params.subId + " ORDER BY `page`;";
	//	console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const onderdeel = result;
        res.status(200).json({onderdeel});
	})   
};

