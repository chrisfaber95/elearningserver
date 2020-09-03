const db = require('../../config/connection');

module.exports = (req, res) => {
	var sqlquery = ""
	if(req.body.type != 'dd'){
		for(var item in req.body){
			if(req.body[item].multiAnswer_id == null){
			  sqlquery += "UPDATE `Question` SET `question_text` = '"+req.body[0].question_text + "', `difficulty` = '"+req.body[0].difficulty+"' WHERE `question_id` = '"+ req.params.questionId+"'; "
			}
			else{
				if(req.body[item].questiontype == 'mc' || req.body[item].questiontype == 'tf'){
					sqlquery += "UPDATE `MultiAnswer` SET `answer_text`= '" + req.body[item].answer_text + "' , `correct_answer`= '" + req.body[item].correct_answer + "' WHERE `multiAnswer_id`= " + req.body[item].multiAnswer_id + "; "
				}
				else if(req.body[item].questiontype == 'm'){
					sqlquery += "UPDATE `MatchAnswer` SET `answer_text`= '" + req.body[item].answer_text + "' , `answer_match`= '" + req.body[item].correct_answer + "' WHERE `matchAnswer_id`= " + req.body[item].multiAnswer_id + "; "
				}
			//else if(req.body[item].questiontype == 'dd'){
				
			//	sqlquery += "UPDATE `Dd_Answer` SET `answer_text`= '" + req.body[item].answer_text + "' , `translateX`= '" + req.body[item].correct_answer + "' WHERE `matchAnswer_id`= " + req.body[item].multiAnswer_id + "; "
			//}
			}
		}
	}
	else{
		sqlquery += "UPDATE `Question` SET `question_text` = '"+req.body.questionText + "', `difficulty` = '"+req.body.difficulty+"' WHERE `question_id` = '"+ req.params.questionId+"'; "
		sqlquery += "UPDATE `Dd_image` SET `image` = '"+req.body.answers[0].image + "' WHERE `question_id` = '"+ req.params.questionId+"'; "
		for(var item in req.body.answers){
			console.log(req.body.answers[item])
			if(req.body.answers[item].dd_answer_id != null){
				sqlquery += "UPDATE `Dd_Answer` SET `answer_text`= '" + req.body.answers[item].answer_text + "' , `height`= '" + req.body.answers[item].height + "' , `translateX`= '" + req.body.answers[item].translateX + "' , `translateY`= '" + req.body.answers[item].translateY + "', `width`= '" + req.body.answers[item].width + "' WHERE `dd_answer_id`= " + req.body.answers[item].dd_answer_id + "; "
			}
			else{
				sqlquery += "INSERT INTO `Dd_Answer` (`question_id`, `answer_text`, `translateX`, `translateY`, `width`, `height`, `language_id`) VALUES ('"+req.params.questionId+"', '"+req.body.answers[item].answer_text+"', '"+req.body.answers[item].translateX+"', '"+req.body.answers[item].translateY+"', '"+req.body.answers[item].width+"', '"+req.body.answers[item].height+"', '"+req.body.language_id+"'); "  
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
