const db = require('../../config/connection');

module.exports = (req, res) => {
    //console.log(req)
	
	//<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/h3NAPsG0Cvs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	var pagetext = req.body.iText
	var text = ""
	console.log(req.body.iText.includes('<figure class="media"><oembed url='))
	if(req.body.iText.includes('<figure class="media"><oembed url=')){
		
		var first = '<iframe';
		var second = 'een></iframe>';
		if(req.body.iText.includes('tube.com/embed/')){
		console.log(pagetext.match(new RegExp(first + "(.*)" + second))[0].toString());
		//var pagetext1 = pagetext.match(new RegExp(first + "(.*)" + second))[0].toString();	
			pagetext = pagetext.replace(/<iframe.*?<\/iframe>/g,'')
			pagetext = pagetext.replace(first, '')
			pagetext = pagetext.replace(second, '')
			console.log(pagetext);
		}
		else{}
		var firstvariable = 'url="';
		var secondvariable = '"></oembed>';
 		//var newtext = pagetext.replace(re, "$1");
		var vidurl = pagetext.match(new RegExp(firstvariable + "(.*)" + secondvariable))[0].toString();	
		if(vidurl.includes('youtube')){
			vidurl = vidurl.replace('tube.com/watch?v=', 'tube.com/embed/')
			vidurl = vidurl.replace(firstvariable, '')
			vidurl = vidurl.replace(secondvariable, '')
			console.log(vidurl);
		}
		else if(vidurl.includes('youtu.be')){
			vidurl = vidurl.replace('tu.be/', 'tube.com/embed/')
			vidurl = vidurl.replace(firstvariable, '')
			vidurl = vidurl.replace(secondvariable, '')
		}
		var embedurl = '<iframe width="560" height="315" src="'+vidurl+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
		console.log(embedurl)
		var text = pagetext.replace('</oembed>', '</oembed>'+embedurl)
		//var text = text1.replace('></oembed></figure>', ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')	
	//	console.log(text)
	}
	else if(req.body.iText.includes('&lt;a')){
		text = pagetext.replace(/&lt;/g, '<')
		text = text.replace(/&gt;/g, '>')
	//	for(var item in pagetext.match(new RegExp('&lt;a href'))){
	//		console.log(item)
	//	}
		
		//text = req.body.iText
	}
	else{
		text = pagetext	
	}
    if(req.params.infoId == 0){
		var sqlquery = "INSERT INTO `Information` (`page`, `subonderdeel_id`, `text`, `title`, `language_id` ) VALUES ("+req.body.iPage + ", "+req.body.sId+ ", "+db.connection.escape(req.body.iText)+", "+db.connection.escape(req.body.iTitle)+", '1');"
    }
    else{
		
		var sqlquery = "UPDATE `Information` SET `text`= " + db.connection.escape(text) + ", `page`= '" + req.body.iPage + "' , `title`= " + db.connection.escape(req.body.iTitle) +", `language_id`= '" + req.body.language_id + "' WHERE `information_id`= " + req.params.infoId + ";"
    }
	console.log(sqlquery)
    db.connection.query(sqlquery, function (err, result3){
		if(err) throw err;
		const info = result3;
		const message = "Information updated"
        res.status(200).json({info, message});
	})   
};
