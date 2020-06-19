const db = require('../../config/connection');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "secretkey23456";

module.exports = (req, res) => {
    console.log(req);
    const  email  =  req.body.email;
	const  hash  =   req.body.pass;
    var sqlquery = "SELECT `user_id`, `email`, `password`, `permission_id`, `language_code` FROM `allUsers` "
        sqlquery += "WHERE `email` = '" + email + "' "
        sqlquery += "OR `username` = '" + email + "' Limit 1;";
	db.connection.query(sqlquery, function (err, result){
		console.log(result);
		if(err){throw err;}
		else{
			bcrypt.compare( hash, result[0].password, function(err, result1){
				if(result1 === true){
					const expiresIn = 24 * 60 * 60 * 1000;
					const accessToken = jwt.sign({id: result1.id}, SECRET_KEY, {
						expiresIn: expiresIn
                    });
                    const user = {
						"email":  result[0].email, 
						"access_token":  accessToken, 
						"expires_in":  expiresIn, 
						"id_token": result[0].user_id ,
						"permissions": result[0].permission_id,
						"language_code" :result[0].language_code
					}
					res.status(200).json({user})
				}
				else{
					var err = "Gebruiker niet gevonden";
					res.status(404).send({
						err
					})
				}
			})
		}
	})   
};
