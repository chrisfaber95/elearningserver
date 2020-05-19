const db = require('../../config/connection');

module.exports = (req, res) => {
   // console.log(req)
    var sqlquery = "INSERT INTO `bollegraafdb1`.`Training` "
        sqlquery += "(`name`, `image`, `difficulty`, `slug`) "
        sqlquery += "VALUES "
        sqlquery += "('"+req.body[0]+"',' ', 1, '"+req.body[0].toLowerCase() +"');"
	console.log(sqlquery)
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const training = result;
        res.status(200).json({training});
	})   
};
