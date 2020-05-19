const db = require('../../config/connection');

module.exports = (req, res) => {
    console.log(req)
    if(req.params.userId !=null && req.body.difficulty != null){
		var sqlquery = "UPDATE `User_Subonderdeel` as `us` SET `us`.`isVisible` = " + req.body.isVisible + " WHERE `us`.`user_id` = " + req.params.userId + " AND `us`.`subonderdeel_id` = " + req.body.subonderdeel_id + ";";
   }
   else if(req.params.userId !=null && req.body.isVisible == 1 && req.body.difficulty == null){
    var sqlquery = "INSERT INTO `User_Subonderdeel` (`isVisible`, `user_id`, `subonderdeel_id`, `difficulty`) VALUES(" + req.body.isVisible + ", " + req.params.userId + ", " + req.body.subonderdeel_id + ", 1);";
   }
   else{
	var sqlquery = "SELECT * FROM `allTrainingen`";
   }
    console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result){
			console.log(result)
		if(err) throw err;
		const training = result;
        res.status(200).json({training});
	})   
};
