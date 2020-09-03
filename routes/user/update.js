const db = require('../../config/connection');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "secretkey23456";

module.exports = (req, res) => {
    //console.log(req);
	
	
	var fullUrl = req.protocol + '://' + req.get('host')
	console.log(fullUrl)
	
    updateUser([req.body, req.params.userId])
    updateUserinfo(req.body)
    updateWorkinfo(req.body)
    updateContactinfo(req.body)

    var sqlquery = "SELECT * FROM `allUsers` "
        sqlquery += "WHERE `user_id` = " + req.params.userId +";";
    db.connection.query(sqlquery, function (err, result){
    if(err) throw err;
    //console.log(result);
    const user = result;
    res.status(200).json({user});
})   
}

const updateUserinfo = (info, cb) => {
    if(info.userinfo_id != null){
        sqlquery = "UPDATE `Userinfo` SET `name`= '" + info.name + "', `surname`= '" + info.surname + "', `city`= '" + info.city + "', `country`= '" + info.country + "', `language_id` = '" + info.language_id + "' WHERE `userinfo_id`= " + info.userinfo_id + ";"
            db.connection.query(sqlquery, function (err, result3){
            if(err) throw err;
        })
    }
}


const updateWorkinfo = (info, cb) => {
	sqlquery = "UPDATE `Workinfo` SET `function`= '" + info.function + "', `company`= '" + info.company + "', `company_city`= '" + info.company_city + "', `company_country`= '" + info.company_country + "' WHERE `workinfo_id`= " + info.workinfo_id + ";"
        db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}


const updateContactinfo = (info, cb) => {
	sqlquery = "UPDATE `Contactinfo` SET `workphone`= '" + info.workphone + "', `privephone`= '" + info.privephone + "' WHERE `contactinfo_id`= " + info.contactinfo_id + ";"
        db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}

const updateUser = (info, cb) => {
    console.log(info[0].expire_date)
	if(info[0].expire_date){
		sqlquery = "UPDATE `User` SET `email`= '" + info[0].email + "', `permission_id` = '" + info[0].permission_id + "', `deleted` = '" + info[0].deleted + "', `expire_date` = '" + info[0].expire_date + "' WHERE `user_id`= " + info[1] + ";"
	}
	else{
		sqlquery = "UPDATE `User` SET `email`= '" + info[0].email + "', `permission_id` = '" + info[0].permission_id + "', `deleted` = '" + info[0].deleted + "', `expire_date` = null WHERE `user_id`= " + info[1] + ";"	
	}
	console.log(sqlquery)    
    db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}