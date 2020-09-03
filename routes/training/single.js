const db = require('../../config/connection');

module.exports = (req, res) => {

   if(req.params.userId !=null){
      var sqlquery = "select `at`.`training_id`, `at`.`tImage`, `at`.`tName`, `at`.`tSlug`, `at`.`onderdeel_id`, `at`.`oName`, `at`.`subonderdeel_id`, `at`.`sName`, `at`.`sDifficulty`, null as `user_id`, null as `isVisible`, null as `difficulty`, null as `user_subonderdeel_id`, null as `isFinished` "
      sqlquery += "from `allTrainingen` as `at` "
      sqlquery += "where `at`.`training_id` = " + req.params.trainingId + " AND `at`.`onderdeel_id` is not null AND `at`.`subonderdeel_id` is not null "
      sqlquery += "union "
      sqlquery += "select `at`.`training_id`, `at`.`tImage`, `at`.`tName`, `at`.`tSlug`, `at`.`onderdeel_id`, `at`.`oName`, `at`.`subonderdeel_id`, `at`.`sName`, `at`.`sDifficulty`, `us`.`user_id`, `us`.`isVisible`, `us`.`difficulty`, `us`.`user_subonderdeel_id`, `us`.`isFinished` "
      sqlquery += "from `allTrainingen` as `at` "
      sqlquery += "right join `User_Subonderdeel` as `us` using (subonderdeel_id) "
      sqlquery += "WHERE `at`.`training_id` = " + req.params.trainingId + " AND `us`.`user_id` = " + req.params.userId  + " order by `subonderdeel_id` asc, `user_id` desc;"
		//var sqlquery = "SELECT * FROM `bollegraafdb`.`allTrainingen` LEFT JOIN `bollegraafdb`.`User_has_Subonderdeel` using (subonderdeel_id) WHERE `user_id` = " + req.params.userId + " OR `user_id` is null AND `onderdeel_id` is not null AND `subonderdeel_id` is not null;";
   }
   else{
	var sqlquery = "SELECT * FROM `allTrainingen` WHERE `training_id` = " + req.params.trainingId + ";";
   }
   // console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result){
		//	console.log(result)
		if(err) throw err;
		const training = result;
        res.status(200).json({training});
	})   
};
