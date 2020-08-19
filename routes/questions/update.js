const db = require('../../config/connection');

module.exports = (req, res) => {
   // console.log(req)
	var sqlquery = ""
   for(var item in req.body){
    if(req.body[item].multiAnswer_id == null){
      sqlquery += "UPDATE `Question` SET `question_text` = '"+req.body[0].question_text + "' WHERE `question_id` = '"+ req.params.questionId+"'; "
    }
    else{
		if(req.body[item].questiontype == 'mc' || req.body[item].questiontype == 'tf'){
			sqlquery += "UPDATE `MultiAnswer` SET `answer_text`= '" + req.body[item].answer_text + "' , `correct_answer`= '" + req.body[item].correct_answer + "' WHERE `multiAnswer_id`= " + req.body[item].multiAnswer_id + "; "
		}
		else if(req.body[item].questiontype == 'm'){
			sqlquery += "UPDATE `MatchAnswer` SET `answer_text`= '" + req.body[item].answer_text + "' , `answer_match`= '" + req.body[item].correct_answer + "' WHERE `matchAnswer_id`= " + req.body[item].multiAnswer_id + "; "
		}
		else if(req.body[item].questiontype == 'dd'){
			
		//	sqlquery += "UPDATE `Dd_Answer` SET `answer_text`= '" + req.body[item].answer_text + "' , `translateX`= '" + req.body[item].correct_answer + "' WHERE `matchAnswer_id`= " + req.body[item].multiAnswer_id + "; "
		}
	}
}
	//console.log(sqlquery)
    db.connection.query(sqlquery, function (err, result3){
		if(err) throw err;
		const info = result3;
        res.status(200).json({info});
	})   
};
