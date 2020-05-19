const db = require('../../config/connection');

module.exports = (req, res) => {

    var sqlquery = "SELECT t.`name` as tName, t.`id` as tId, t.`image` as tImage, "
        sqlquery += "o.`id` as oId, o.`name` as oName, o.`image` as oImage, o.`time` as oTime, "
        sqlquery += "s.`id` as sId, s.`name` as sName, s.`image` as sImage "
        sqlquery += "FROM `Subonderdeel` AS s "
        sqlquery += "JOIN `Onderdelen` as o ON s.`Onderdeel_id` = o.`id` "
        sqlquery += "JOIN `Training` as t ON o.`Training_id` = t.`id`"
        sqlquery += "WHERE t.`id` = " + req.params.trainingId +";";
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		const training = result;
        res.status(200).json({training});
	})   
};
