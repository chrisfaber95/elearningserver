const db = require('../../config/connection');

module.exports = (req, res) => {
	console.log(req.body.question.answers)
	var sqlquery = ""
	if(req.body.question.type == 'tf' || req.body.question.type == 'mc' || req.body.question.type == 'm'){
		sqlquery = "INSERT INTO `Question` (`subonderdeel_id`, `questiontype`, `difficulty`, `question_text`, `language_id`) VALUES ('"+req.body.subId+"', '"+req.body.question.type+"', 1, '"+req.body.question.questionText+"', '"+req.body.question.language_id+"');"  	
   }
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		var sqlquery = ""
		if(req.body.type == 'tf' || req.body.question.type == 'mc'){
			for(var i in req.body.question.answers){
				console.log(req.body)
				if(req.body.question.correct_answer.indexOf(req.body.question.answers[i].text) > -1){
					sqlquery += "INSERT INTO `MultiAnswer` (`question_id`, `answer_text`, `correct_answer`, `language_id`) VALUES ('"+result.insertId+"', '"+req.body.question.answers[i].text+"', 'true', '"+req.body.question.language_id+"'); " 
				}
				else{
				   sqlquery += "INSERT INTO `MultiAnswer` (`question_id`, `answer_text`, `correct_answer`, `language_id`) VALUES ('"+result.insertId+"', '"+req.body.question.answers[i].text+"', 'false', '"+req.body.question.language_id+"'); " 			   
			   }
			}
			console.log(sqlquery)
			db.connection.query(sqlquery, function (err, result1){
				if(err) throw err;
			})
		}
		if(req.body.question.type == 'm'){
			for(var i in req.body.question.answers){
				sqlquery += "INSERT INTO `MatchAnswer` (`question_id`, `answer_text`, `answer_match`, `language_id`) VALUES ('"+result.insertId+"', '"+req.body.question.answers[i].text+"', '"+req.body.question.correct_answer[i]+"', '"+req.body.question.language_id+"'); " 
			}
			console.log(sqlquery)
			db.connection.query(sqlquery, function (err, result1){
				if(err) throw err;
			})
		}
		console.log(result);
		const message = result;
        res.status(200).json({message});
	})   
};
