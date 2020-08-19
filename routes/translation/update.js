const csv = require('csv-parser')
const fs = require('fs')
var parse = require('csv-parse');


module.exports = (req, res) => {
	//console.log(req)
	var csvData=[];
	fs.createReadStream(__dirname +'/vertalingbollegraaf.csv')
	.pipe(parse({delimiter: ';'}))
	.on('data', function(csvrow) {
		console.log(csvrow);
		//do something with csvrow
		csvData.push(csvrow);        
	})
	.on('end',function() {
	  //do something with csvData
	  console.log(csvData);
	var message = "Translations updated"
	res.status(200).json({message});
	});
	/*
	var sqlquery = "SELECT * "
		sqlquery += "FROM `bollegraafdb1`.`Language` "

		db.connection.query(sqlquery, function (err, result){
		if(err) throw err;
	//	console.log(result);
		const language = result;
		
	})   */
	//console.log(req)
};