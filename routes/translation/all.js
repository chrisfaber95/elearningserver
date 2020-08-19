const csv = require('csv-parser')
const fs = require('fs')
var parse = require('csv-parse');


module.exports = (req, res) => {
	
	
const results = [];
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
		  res.status(200).json({csvData});
		});
 
 /*
	fs.createReadStream('./vertalingbollegraaf.csv')
		.pipe(csv({ separator: ';' }))
		.on('data', (data) => results.push(data))
		.on('end', () => {
		console.log(results);
		// [
		//   { NAME: 'Daffy Duck', AGE: '24' },
		//   { NAME: 'Bugs Bunny', AGE: '22' }
		// ]
		res.status(200).json({results});
	});*/
};
