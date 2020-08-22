const db = require('../../config/connection');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "secretkey23456";
const nodemailer = require("nodemailer");

	function sendUserMail(mail, token){
		  // Generate test SMTP service account from ethereal.email
		  // Only needed if you don't have a real mail account for testing
		 // let testAccount = await nodemailer.createTestAccount();

		  // create reusable transporter object using the default SMTP transport
		  let transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
				user: 'chris.arma2@gmail.com',
				pass: 
			  }
		});
			var url = "https://www.chrisfaber.tk/passreset?token="+token
		  let mailOptions = {
			from: '"Chris Faber Bollegraaf" chris.arma2@gmail.com', // sender address
			to: mail, // list of receivers
			subject: "Forget Bollegraaf E-learning password", // Subject line
			text: "", // plain text body
			html: 'A request has been send to change your password. If this was not you, you can disregard this mail. If you requested to reset your password. You can change your password by clicking on the following link: <a href="' + url +'" >'+url+'</a>' // html body
		  };
		
			transporter.sendMail(mailOptions, function(error, info){
				  if (error) {
					console.log(error);
				  } else {
					console.log('Email sent: ' + info.response);
				  }
			});
		}	

module.exports = (req, res) => {
	if(req.body.token){
		console.log(req.body)
		const  email  =  req.body.email;
		const  pass  =  req.body.pass;
		var sqlquery = "SELECT `user_id`, `email`, `resetPass` FROM `User` "
        sqlquery += "WHERE `email` = '" + email + "' "
        sqlquery += "AND `resetPass` = '" + req.body.token + "' Limit 1;";
		db.connection.query(sqlquery, function (err, result){
			console.log(err);
			console.log(result);
			if(err){throw err;}
			else if(result.length == 0){
				var err = "This email or token is incorrect";
				var err_code = 1
					res.status(200).json({
						err, err_code
				})
			}
			else{
				
				 bcrypt.hash(pass, salt, function(err, hash) {
				// Store hash in your password DB.
					password = hash;
					var sqlquery = "UPDATE `User` SET `resetPass` = NULL, "
					sqlquery += "`password` = '" + password + "' "
					sqlquery += "WHERE `email` = '" + email + "' "
					sqlquery += "OR `username` = '" + email + "' Limit 1;";
					
					db.connection.query(sqlquery, function (err, result){
						if(err) throw err;
						console.log(result);
						const user = "Password changed";
						res.status(200).json({user});
					}) 
				})
				
				
			}
		})   
		
	}
	else{
		const  email  =  req.body.email;
		console.log(req.body);
		var length = 10,
			charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
			retVal = "";
		for (var i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}
		
		var sqlquery = "UPDATE `User` SET `resetPass`= '" + retVal + "' "
			sqlquery += "WHERE `email` = '" + email + "' "
			sqlquery += "OR `username` = '" + email + "' Limit 1;";
			
			db.connection.query(sqlquery, function (err, result){
			if(err) throw err;
			console.log(result);
			sendUserMail(email, retVal)
			const user = "Mail send";
			res.status(200).json({user});
		})   
	}
}
