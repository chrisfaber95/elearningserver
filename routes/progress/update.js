const db = require('../../config/connection');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "secretkey23456";

module.exports = (req, res) => {
    console.log(req);
    updateUser(req.body)
    updateUserinfo(req.body)
    updateWorkinfo(req.body)
    updateContactinfo(req.body)

    var sqlquery = "SELECT * FROM `allUsers` "
        sqlquery += "WHERE `user_id` = " + req.params.userId +";";
    db.connection.query(sqlquery, function (err, result){
    if(err) throw err;
    console.log(result);
    const user = result;
    res.status(200).json({user});
})   
}

const updateUserinfo = (info, cb) => {
	sqlquery = "UPDATE `Userinfo` SET `name`= '" + info.name + "', `surname`= '" + info.surname + "', `city`= '" + info.city + "', `country`= '" + info.country + "' WHERE `id`= " + info.id + ";"
        db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}


const updateWorkinfo = (info, cb) => {
	sqlquery = "UPDATE `Workinfo` SET `function`= '" + info.function + "', `company`= '" + info.company + "', `company_city`= '" + info.company_city + "', `company_country`= '" + info.company_country + "' WHERE `id`= " + info.Workinfo_id + ";"
        db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}


const updateContactinfo = (info, cb) => {
	sqlquery = "UPDATE `Contactinfo` SET `workphone`= '" + info.workphone + "', `privephone`= '" + info.privephone + "' WHERE `id`= " + info.Contactinfo_id + ";"
        db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}

const updateUser = (info, cb) => {
	sqlquery = "UPDATE `Users` SET `email`= '" + info.email + "' WHERE `id`= " + info.id+ ";"
        db.connection.query(sqlquery, function (err, result3){
        if(err) throw err;
    })
}