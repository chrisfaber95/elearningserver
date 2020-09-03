const db = require('../../config/connection');

module.exports = (req, res) => {
   
		const rights = "test";
        res.status(200).json({rights});  
};
