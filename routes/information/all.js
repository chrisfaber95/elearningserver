const db = require('../../config/connection');

module.exports = (req, res) => {
   
    var sqlquery = "SELECT i.`information_id` as `iId`, i.`text` as `iText`, i.`page` as `iPage`, i.`difficulty` as `iDifficulty`, s.`subonderdeel_id` as `sId`, i.`tilte` as `iTitle`, i.`language_id` "
        sqlquery += "FROM `Information` as i "
		sqlquery += "LEFT JOIN `Subonderdeel`using (`subonderdeel_id`) Order by `iPage`; ";
		
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		//console.log(result);
		const info = result;
        res.status(200).json({info});
	})   
};

