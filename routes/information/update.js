const db = require('../../config/connection');

module.exports = (req, res) => {
    //console.log(req)
    if(req.params.infoId == 0){
		var sqlquery = "INSERT INTO `Information` (`page`, `subonderdeel_id`, `text`) VALUES ("+req.body.iPage + ", "+req.body.sId+ ", '"+req.body.iText+"');"
    }
    else{
		var sqlquery = "UPDATE `Information` SET `text`= '" + req.body.iText + "' , `page`= '" + req.body.iPage + "' WHERE `information_id`= " + req.params.infoId + ";"
    }
	console.log(sqlquery)
    db.connection.query(sqlquery, function (err, result3){
		if(err) throw err;
		const info = result3;
		const message = "Information updated"
        res.status(200).json({info, message});
	})   
};
