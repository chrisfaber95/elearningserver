const db = require('../../../config/connection');

module.exports = (req, res) => {
   // console.log(req)
    var sqlquery = "INSERT INTO `bollegraafdb1`.`Onderdeel` "
        sqlquery += "(`name`, `training_id`, `image`, `time`, `difficulty`) "
        sqlquery += "VALUES "
        sqlquery += "('"+req.body[0]+"',"+ req.params.trainingId +", ' ', 10, 1);"
	console.log(sqlquery)
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const training = result;
        res.status(200).json({training});
	})   
};
