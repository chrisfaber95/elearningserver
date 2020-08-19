const db = require('../../config/connection');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "secretkey23456";
const nodemailer = require("nodemailer");





	function sendUserMail(mail, pass){
		  // Generate test SMTP service account from ethereal.email
		  // Only needed if you don't have a real mail account for testing
		 // let testAccount = await nodemailer.createTestAccount();

		  // create reusable transporter object using the default SMTP transport
		  let transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
				user: 'chris.arma2@gmail.com',
				pass: 'keeperboy12'
			  }
		});
		
		  let mailOptions = {
			from: '"Chris Faber Bollegraaf" chris.arma2@gmail.com', // sender address
			to: mail, // list of receivers
			subject: "Een account is aangemaakt", // Subject line
			html: "Een account is aangemaakt op dit emailadres met de volgende wachtwoord: " + pass  // html body
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
	const  email  =  req.body.email;
	
	
	var length = 10,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
	
    const  hash  =   retVal;

    var password = "";
	let  pass = "";
	pass = retVal
    bcrypt.hash(retVal, salt, function(err, hash) {
    // Store hash in your password DB.
        password = hash;
        createUser([req.body, password], (err, result)=>{
			console.log(result)
			if(err){ return  res.status(500).send("Server error!")}
        })
    })
	console.log(pass)
	sendUserMail(email, pass)
}

const  createUser  = (info, cb) => {
	console.log(info)
    var sqlquery = "CALL register_user('"+info[0].email+"', '"+info[1]+"', '"+info[0].permission_id+"', '"+info[0].language_id+"'); ";
	console.log(sqlquery);
	db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
		console.log(result)
		console.log(result)
		
					
		var sqlquery = "UPDATE `bollegraafdb1`.`Userinfo` SET `name`= '" + info[0].name + "', `surname`= '" + info[0].surname + "', `city`= '" + info[0].city + "', `country`= '" + info[0].country + "' WHERE `userinfo_id`= '" + result[0][0].userinfo_id + "'; "
			sqlquery += "UPDATE `bollegraafdb1`.`Workinfo` SET `function`= '" + info[0].function + "', `company`= '" + info[0].company + "', `company_city`= '" + info[0].company_city + "', `company_country`= '" + info[0].company_country + "' WHERE `workinfo_id`= '" + result[0][0].workinfo_id + "'; "
			sqlquery += "UPDATE `bollegraafdb1`.`Contactinfo` SET `workphone`= '" + info[0].workphone + "', `privephone`= '" + info[0].privephone + "' WHERE `contactinfo_id`= '" + result[0][0].contactinfo_id + "'; "

		console.log(sqlquery)
		db.connection.query(sqlquery, function (err, result3){
			if(err) throw err;
			console.log(result3)
		})
		
		return result;
	}) 	
}

function updateUserinfo (info, id){
    console.log(info)
    var sqlquery = "UPDATE `Userinfo` SET `name`= '" + info.name + "', `surname`= '" + info.surname + "', `city`= '" + info.city + "', `country`= '" + info.country + "' WHERE `userinfo_id`= '" + id + "';"
      console.log(sqlquery)
	db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}


function updateWorkinfo (info, id){
	var sqlquery = "UPDATE `Workinfo` SET `function`= '" + info.function + "', `company`= '" + info.company + "', `company_city`= '" + info.company_city + "', `company_country`= '" + info.company_country + "' WHERE `workinfo_id`= '" + id + "';"
      console.log(sqlquery)
	  db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}


function updateContactinfo (info, id){
	var sqlquery = "UPDATE `Contactinfo` SET `workphone`= '" + info.workphone + "', `privephone`= '" + info.privephone + "' WHERE `contactinfo_id`= '" + id + "';"
    console.log(sqlquery)
	    db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}