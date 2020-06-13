const db = require('../../config/connection');

module.exports = (req, res) => {
   
		var sqlquery = "INSERT INTO `Ref_Information` (`information_id`, `subonderdeel_id`, `ref_information_text`) VALUES ("+req.body.opened + ", "+req.body.subId+ ", '"+req.body.refText+"');"
    
	console.log(sqlquery)
    db.connection.query(sqlquery, function (err, result3){
		if(err) throw err;
		const info = result3;
		const message = "Referention saved"
        res.status(200).json({info, message});
	}) 
};
