var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var JSON = require('json');
var url = require('url');
var fs = require('fs');

var cnodeUrl = 'https://cnodejs.org';


		var ep = new eventproxy();
		var ep1 = new eventproxy();
		var ep2 = new eventproxy();

		ep1.after('all', 2, function(datas){
			var i = 0;
			var tem1 = datas[0];
			var tem2 = datas[1];
			console.log('222222222222222222222222222222222')
			console.log(tem1);
			console.log(tem2);


		})


superagent.get(cnodeUrl)
	.end(function(err, sres){
		if(err){
			return console.log(err);
		}
		var topicUrls = [];
		var $ = cheerio.load(sres.text);

		$('#topic_list .topic_title').each(function(index, element){
			var $element = $(element);
			var href = url.resolve(cnodeUrl, $element.attr('href'));
			topicUrls.push(href);
		});
		console.log(topicUrls);


		var finalData = [];

		var finalDate = [];
		ep.after('topic_html', topicUrls.length, function(topics){
			console.log('topics topicUrl');
			var ret = {};
			finalDate = topics.map(function(topicPair){
				var topicUrl = topicPair[0];
				var topicHtml = topicPair[1];
				var $ = cheerio.load(topicHtml);
				var author = $('.author_content a').eq(0).attr('href')|| $('.author_content a').attr('href')||'';
				console.log('author'+author);
				var authorUrl = url.resolve(cnodeUrl, author);

				var authorInfo = getAuthorNameAndScore(authorUrl);
				// var authorInfo = getAuthorNameAndScore2(authorUrl);

				return ({
					title: $('.topic_full_title').text().trim(),
					href : topicUrl,
					comment1: $('.reply_content .markdown-text').eq(0).text(),
					// score: authorInfo.score||'',
					// name: authorInfo.name||''
				});
			});
			console.log('final:');
			console.log(finalDate);
			ep1.emit('all', finalDate);
		});

			var i = 0;
		topicUrls.forEach(function(topicUrl){
			console.log('each + topicUrl: ' + topicUrl);
			superagent.get(topicUrl)
			.end(function(err, sres){
				if(err){
					console.log(err);
				}
				console.log(i++);
				ep.emit('topic_html', [topicUrl, sres.text]);
			})
		});


	});

		function getAuthorNameAndScore(url){
			console.log('url in getA N S '+url);
			var ret = {};
			 superagent.get(url)
				.end(function(err, sres){

		ep2.after('allData', 40, function(datas){
				console.log('123');
				datas = datas.map(function(datajson){
					var dataUrl = datajson.url;
					var dataName = datajson.name;
					var dataScore = datajson.score;
					return ({
						dataUrl:dataUrl,
						name: dataName,
						score: dataScore
					})

				})
				console.log(datas);
				ep1.emit('all', datas);
				});

					console.log('url in getA N S END !!!!!!!!!!!!!');
					if(err){
						console.log(err);
					}
					var $ = cheerio.load(sres.text);
					var name = $('.userinfo a').html();
					var score = $('.userinfo .big').eq(0).html();
					console.log('name+score'+name+' '+score)
					ep2.emit('allData', {
						url: url,
						name: name,
						score:score
					})


	
		})
}
