const db = require('../../config/connection');

module.exports = (req, res) => {

    var sqlquery = "SELECT `userinfo_id`, `email`, `username`, `permission_id`, `permission_name`, `name`, `surname`, `city`, `country`, `language_id`,`contactinfo_id`, `workphone`, `privephone`, `function`, `workinfo_id`, `company`, `company_city`, `company_country`, `deleted`, `expire_date` FROM `allUsers` "
        sqlquery += "WHERE `user_id` = " + req.params.userId +";";
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const user = result;
        res.status(200).json({user});
	})   
};
