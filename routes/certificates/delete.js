const db = require('../../config/connection');

module.exports = (req, res) => {
   
    var sqlquery = "DELETE FROM `Certificate` "
		sqlquery += "WHERE `Certificate`.`certificate_id` = " + req.params.certId +";"

		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		console.log(result);
		const message = "Certificate succesvol verwijderd";
        res.status(200).json({message});
	})   
};
