const db = require('../../config/connection');

module.exports = (req, res) => {
   
    var sqlquery = "DELETE FROM `Information` "
		sqlquery += "WHERE `Information`.`information_id` = " + req.params.infoId +";"

		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		console.log(result);
		const message = "Pagina succesvol verwijderd";
        res.status(200).json({message});
	})   
};
