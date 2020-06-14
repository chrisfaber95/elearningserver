const db = require('../../config/connection');

module.exports = (req, res) => {

    var sqlquery = "INSERT INTO `User_Question` (`question_id`, `user_id`, `correct_answers`, `possible_answers`, `date`) VALUES ('"+req.body.question_id+"', '"+req.params.userId+"', '"+req.body.correct_answers+"', '"+req.body.possible_answers+"', NOW()); "	  
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const progress = result;
        res.status(200).json({progress});
	})   
};
