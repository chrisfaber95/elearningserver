const db = require('../../config/connection');

module.exports = (req, res) => {
   console.log(req)
    var sqlquery = "select tfq.`question_id`, q.`questiontype`, q.`difficulty`, tfq.`question_text`, tfa.`indentifier`, tfa.`answer_text`, tfa.`isCorrect`, `at`.`training_id`, `at`.`tName`, `at`.`onderdeel_id`, `at`.`oName`, `at`.`subonderdeel_id`, `at`.`sName` "
        sqlquery += "from `Tf_Question` as tfq "
        sqlquery += "left join `Tf_Answer` as tfa using(`tf_question_id`) "
        sqlquery += "LEFT JOIN `Question` as q using (`question_id`) "
        sqlquery += "LEFT JOIN `allTrainingen` as `at` using (`subonderdeel_id`) "
		if(req.params.subId != null){
			sqlquery += "WHERE `subonderdeel_id` = "+req.params.subId+" "
		}
        sqlquery += "union "
        sqlquery += "select mcq.`question_id`, q.`questiontype`, q.`difficulty`, mcq.`question_text`, mca.`indentifier`, mca.`answer_text`, mca.`isCorrect`, `at`.`training_id`, `at`.`tName`, `at`.`onderdeel_id`, `at`.`oName`, `at`.`subonderdeel_id`, `at`.`sName` "
        sqlquery += "from `Mc_Question` as mcq "
        sqlquery += "left join `Mc_Answer` as mca using(`Mc_question_id`) "
        sqlquery += "LEFT JOIN `Question` as q using (`question_id`) "
		sqlquery += "LEFT JOIN `allTrainingen` as `at` using (`subonderdeel_id`) "
		if(req.params.subId != null){
			sqlquery += "WHERE `subonderdeel_id` = "+req.params.subId+""
		}
			sqlquery += ";"
		console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		//console.log(result);
		const question = result;
		const test = "test"
        res.status(200).json({question, test});
	})   
};

