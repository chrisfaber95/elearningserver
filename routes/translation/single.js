const csv = require('csv-parser')
const fs = require('fs')
var parse = require('csv-parse');



module.exports = (req, res) => {
	console.log(req)
	const file = `${__dirname}/vertalingbollegraaf.csv`;
	res.attachment(file);
	res.status(200).send(data)
};