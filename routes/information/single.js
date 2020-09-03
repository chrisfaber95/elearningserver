const db = require('../../config/connection');

module.exports = (req, res) => {
   //console.log(req)
    var sqlquery = "SELECT i.`information_id` as `iId`, i.`text` as `iText`, i.`page` as `iPage`, i.`title` as `iTitle`, i.`difficulty` as `difficulty`, s.`subonderdeel_id` as `sId`, i.`language_id` "
        sqlquery += "FROM `Information` as i "
		sqlquery += "LEFT JOIN `Subonderdeel` as s using (subonderdeel_id) "
		sqlquery += "WHERE s.`subonderdeel_id` = "+req.params.subId + " ORDER BY `iPage` ASC;";
		//console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		//console.log(result);
		const info = result;
        res.status(200).json({info});
	})   
};
