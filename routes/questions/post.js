const db = require('../../config/connection');

module.exports = (req, res) => {
	//console.log(req.body.question.answers)
	var sqlquery = ""
	if(req.body.question.type == 'tf' || req.body.question.type == 'mc' || req.body.question.type == 'm' || req.body.question.type == 'dd'){
		sqlquery = "INSERT INTO `Question` (`subonderdeel_id`, `questiontype`, `difficulty`, `question_text`, `language_id`) VALUES ('"+req.body.subId+"', '"+req.body.question.type+"', '"+req.body.question.difficulty +"', '"+req.body.question.questionText+"', '"+req.body.question.language_id+"');"  	
   }
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		var sqlquery = ""
		if(req.body.question.type == 'tf' || req.body.question.type == 'mc'){
			sqlquery = ""
			for(var i in req.body.question.answers){
				sqlquery += "INSERT INTO `MultiAnswer` (`question_id`, `answer_text`, `correct_answer`, `language_id`) VALUES ('"+result.insertId+"', '"+req.body.question.answers[i].text+"', '"+req.body.question.correct_answer[i]+"', '"+req.body.question.language_id+"'); " 
			}
			db.connection.query(sqlquery, function (err, result1){
				if(err) throw err;
			})
		}
		else if(req.body.question.type == 'm'){
			sqlquery = ""
			for(var i in req.body.question.answers){
				sqlquery += "INSERT INTO `MatchAnswer` (`question_id`, `answer_text`, `answer_match`, `language_id`) VALUES ('"+result.insertId+"', '"+req.body.question.answers[i].text+"', '"+req.body.question.correct_answer[i]+"', '"+req.body.question.language_id+"'); " 
			}
			db.connection.query(sqlquery, function (err, result1){
				if(err) throw err;
			})
		}
		else if(req.body.question.type == 'dd'){
			sqlquery = ""
			for(var i in req.body.question.answers){
				sqlquery += "INSERT INTO `Dd_Answer` (`question_id`, `answer_text`, `translateX`, `translateY`, `width`, `height`, `language_id`) VALUES ('"+result.insertId+"', '"+req.body.question.answers[i].answer_text+"', '"+req.body.question.answers[i].x+"', '"+req.body.question.answers[i].y+"', '"+req.body.question.answers[i].width+"', '"+req.body.question.answers[i].height+"', '"+req.body.question.language_id+"'); "  
			}
			sqlquery += "INSERT INTO `Dd_image` (`question_id`, `image`) VALUES ('"+result.insertId+"', '"+req.body.question.image+"'); "
			db.connection.query(sqlquery, function (err, result1){
				if(err) throw err;
			})
		}
		const message = result;
        res.status(200).json({message});
	})   
};
