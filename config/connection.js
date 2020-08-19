const mysql = require('mysql');
console.log(process.env)
const connection = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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
