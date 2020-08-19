const db = require('../../config/connection');

module.exports = (req, res) => {
   
    var sqlquery = "DELETE FROM `Ref_Information` "
		sqlquery += "WHERE `Ref_Information`.`ref_information_id` = " + req.params.refId +";"

		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		console.log(result);
		const message = "Pagina succesvol verwijderd";
        res.status(200).json({message});
	})   
};
