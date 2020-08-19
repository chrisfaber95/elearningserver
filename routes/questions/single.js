const db = require('../../config/connection');

module.exports = (req, res) => {
  // console.log(req)
	if(req.params.type != 'dd'){
		var sqlquery = "select q.`question_id`, q.`questiontype`, q.`question_text`, q.`language_id`, q.`difficulty`, mca.`answer_text`, mca.`correct_answer`, mca.`multiAnswer_id`, `q`.`subonderdeel_id` "
			sqlquery += "from `Question` as q "
			sqlquery += "left join `MultiAnswer` as mca using(`question_id`) "
			if(req.params.questionId != null){
				sqlquery += "WHERE `question_id` = "+req.params.questionId+" "
				sqlquery += "AND `answer_text` IS NOT NULL "
			}
			sqlquery += "union "
			sqlquery += "select q.`question_id`, q.`questiontype`, q.`question_text`, q.`language_id`, q.`difficulty`, ma.`answer_text`, ma.`answer_match`, ma.`matchAnswer_id`, `q`.`subonderdeel_id` "
			sqlquery += "from `Question` as q "
			sqlquery += "left join `MatchAnswer` as ma using(`question_id`) "
			if(req.params.questionId != null){
				sqlquery += "WHERE `question_id` = "+req.params.questionId+" "
				sqlquery += "AND `answer_text` IS NOT NULL"
			}
				sqlquery += ";"
			//console.log(sqlquery)
			db.connection.query(sqlquery, function (err, result){
			if(err) throw err;
			//console.log(result);
			const question = result;
			const test = "test"
			res.status(200).json({question, test});
		})
	}
	else{
		var sqlquery = "select q.`question_id`, q.`questiontype`, q.`language_id`, q.`difficulty`, q.`question_text`, dd.`dd_answer_id`, dd.`answer_text`, dd.`translateX`, dd.`translateY`, dd.`width`, dd.`height`, `q`.`subonderdeel_id`, i.`image` "
			sqlquery += "from `Question` as q "
			sqlquery += "left join `Dd_Answer` as dd using(`question_id`) "
			sqlquery += "left join `Dd_image` as i using(`question_id`) "
			if(req.params.questionId != null){
				sqlquery += "WHERE `question_id` = "+req.params.questionId+" "
				sqlquery += "AND `answer_text` IS NOT NULL "
			}
			db.connection.query(sqlquery, function (err, result){
			if(err) throw err;
			//console.log(result);
			const question = result;
			const test = "test"
			res.status(200).json({question, test});
		})
	}
};


