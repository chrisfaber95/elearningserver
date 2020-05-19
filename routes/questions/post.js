const db = require('../../config/connection');

module.exports = (req, res) => {
	var sqlquery = ""
	if(req.body.type == 'tf'){
		sqlquery = "INSERT INTO `Question` (`subonderdeel_id`, `questiontype`, `difficulty`) VALUES ('"+req.body.subId+"', '"+req.body.type+"', 1);"
	  //	sqlquery += "SET @questionid = (LAST_INSERT_ID());"
		sqlquery += "INSERT INTO `Tf_Question` (`question_id`, `question_text`) VALUES (LAST_INSERT_ID(), '"+req.body.questionText+"');"
	  //	sqlquery += "SET @tfquestionid = (LAST_INSERT_ID());"
  		for(var i in req.body.answers){
			sqlquery += "INSERT INTO `Tf_Answer` (`tf_question_id`, `answer_text`, `isCorrect`) VALUES (LAST_INSERT_ID(), '"+req.body.answers[i].value+"', '"+req.body.answers[i].correct+"');" 
	  	}
   }
	else if(req.body.type == "mc"){
		sqlquery = "INSERT INTO `Question` (`subonderdeel_id`, `questiontype`, `difficulty`) VALUES ('"+req.body.subId+"', '"+req.body.type+"', 1);"
	  	sqlquery += "SET @questionid = (LAST_INSERT_ID());"
		sqlquery += "INSERT INTO `Mc_Question` (`question_id`, `question_text`) VALUES (@questionid, '"+req.body.questionText+"');"
	  	sqlquery += "SET @mcquestionid = (LAST_INSERT_ID());"
  		for(var i in req.body.answers){
			sqlquery += "INSERT INTO `Mc_Answer` (`Mc_question_id`, `answer_text`, `isCorrect`) VALUES (@mcquestionid, '"+req.body.answers[i].value+"', '"+req.body.answers[i].correct+"');" 
	  	}
   }
	console.log(req.body)
	console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		console.log(result);
		const message = result;
        res.status(200).json({message});
	})   
};
