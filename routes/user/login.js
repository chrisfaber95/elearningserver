const db = require('../../config/connection');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "secretkey23456";
const moment = require('moment');

module.exports = (req, res) => {
   // console.log(req);
    const  email  =  req.body.email;
	const  hash  =   req.body.pass;
    var sqlquery = "SELECT `user_id`, `email`, `password`, `permission_id`, `language_code`, `deleted`, `expire_date` FROM `allUsers` "
        sqlquery += "WHERE `email` = '" + email + "' "
        sqlquery += "OR `username` = '" + email + "' Limit 1;";
	db.connection.query(sqlquery, function (err, result){
	//	console.log(err);
	//	console.log(result);
		if(err){throw err;}
		else if(result.length == 0){
			var err = "This email or password is incorrect";
			var err_code = 1
				res.status(200).json({
					err, err_code
			})
		}
		else if(result[0].deleted == 1){
			var err = "This account is temporary closed.";
			var err_code = 2
				res.status(200).json({
					err, err_code
			})
		}
		else if(moment(result[0].expire_date).format('YYYY MM DD') <= moment().format('YYYY MM DD')){
			var err = "This account is temporary closed.";
			var err_code = 2
				res.status(200).json({
					err, err_code
			})
		}
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
					var err = "This email or password is incorrect";
					var err_code = 1
						res.status(200).json({
							err, err_code
					})
				}
			})
		}
	})   
};
