const db = require('../../config/connection');

module.exports = (req, res) => {
   
    var sqlquery = "SELECT ri.`ref_information_id` as `riId`, ri.`information_id` as `oiId`, ri.`subonderdeel_id` as `miId`, ri.`ref_information_text` as `riText` "
        sqlquery += "FROM `Ref_Information` as ri ;"
		console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		//console.log(result);
		const referention = result;
        res.status(200).json({referention});
	})   
};


