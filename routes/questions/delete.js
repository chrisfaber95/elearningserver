const db = require('../../config/connection');

module.exports = (req, res) => {
   
   var sqlquery = "DELETE FROM `Question` WHERE `question_id` = " + req.params.questionId + ";";
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const training = "question deleted";
		res.status(200).json({training});
		})   
};
