const db = require('../../config/connection');

module.exports = (req, res) => {
   
    var sqlquery = "SELECT * FROM `allUsers`; ";
		
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const user = result;
        res.status(200).json({user});
	})   
};

