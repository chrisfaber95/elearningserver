const mysql = require('mysql');

const connection = mysql.createPool({
	host: "localhost",
	user: "bollegraaf",
	password: "password",
    database: "bollegraafdb1",
	multipleStatements: true
})
/*
connection.connect(function(err){
	if (err) throw err;
	console.log("connected to Database");
});*/

module.exports = {
    connection: connection 
};
