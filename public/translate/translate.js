const csv = require('csv-parser')
const fs = require('fs')

  
module.exports = (req, res) => {
	
	
const results = [];
 
	fs.createReadStream('/translate/vertalingbollegraaf.csv')
		.pipe(csv({ separator: ';' }))
		.on('data', (data) => results.push(data))
		.on('end', () => {
		console.log(results);
		// [
		//   { NAME: 'Daffy Duck', AGE: '24' },
		//   { NAME: 'Bugs Bunny', AGE: '22' }
		// ]
		res.status(200).json({results});
	});
};
