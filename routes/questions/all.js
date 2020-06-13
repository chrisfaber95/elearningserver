const db = require('../../config/connection');

module.exports = (req, res) => {
  // console.log(req)
    var sqlquery = "select q.`question_id`, q.`questiontype`, q.`question_text`, mca.`answer_text`, mca.`correct_answer`, mca.`multiAnswer_id`, `q`.`subonderdeel_id` "
        sqlquery += "from `Question` as q "
        sqlquery += "left join `MultiAnswer` as mca using(`question_id`) "
		if(req.params.subId != null){
			sqlquery += "WHERE `subonderdeel_id` = "+req.params.subId+" "
		}
        sqlquery += "union "
		sqlquery += "select q.`question_id`, q.`questiontype`, q.`question_text`, ma.`answer_text`, ma.`answer_match`, ma.`matchAnswer_id`, `q`.`subonderdeel_id` "
        sqlquery += "from `Question` as q "
		sqlquery += "left join `MatchAnswer` as ma using(`question_id`) "
		if(req.params.subId != null){
			sqlquery += "WHERE `subonderdeel_id` = "+req.params.subId+""
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
};

