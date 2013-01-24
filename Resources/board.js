function Board(){
	var that = this;
	this.page = 1;
	this.listurl = "http://cyphers.nexon.com/cyphers/article/art/{page}";
	this.viewurl = "http://cyphers.nexon.com/cyphers/article/art/topics/{idx}";
	
	this.list = [];
	
	var getList = function(cb){
		var url = that.listurl.replace("{page}", that.page);
		var xhr = Ti.Network.createHTTPClient({
			onload:function(){
				/*
				var res = Ti.Codec.decodeString({source:this.responseText});
				alert(res);
				*/
				var res = decodeURIComponent(this.responseText);
				var listItemEx = /<p class="thum"><a href="\/cyphers\/article\/art\/topics\/([^"]+)"><img src="http:\/\/pub.cyphers.co.kr\/thumbnail2\/art\/([^"]+)"><\/a><\/p>[\t\s\n ]*<p class="tit" title="([^"]+)">/gi;
				var resultArray = listItemEx.exec(res);
				while(resultArray){
					that.list.push({idx:resultArray[1], thumb:resultArray[2], leftImage:"http://pub.cyphers.co.kr/thumbnail2/art/" + resultArray[2], title:resultArray[3]});
					resultArray = listItemEx.exec(res);
				}
				if(cb){
					cb(that.list);
				}
			},
			onerror:function(e){
				alert(e.error);
			},
			timeout:500
		});
		
		xhr.open("GET", url);
		xhr.send();
	}
	that.getList = getList;
	
	var getDetail = function(idx, cb){
		var url = that.viewurl.replace("{idx}", idx);
		
		Ti.API.debug(idx);
		var xhr = Ti.Network.createHTTPClient({
			onload:function(){
				var res = decodeURIComponent(this.responseText);
				var title = /<p title="([^"]+)"/gi.exec(res)[1];
				var author = /<p class="logo">[\s\t\n ]*<img src="[^"]+" style="vertical-align:middle" alt="">([^<]+)<strong>/gi.exec(res)[1];
				var img = /<img src="(http:\/\/pub.cyphers.co.kr\/images2\/art\/[^"]+)" class="txc-image"/gi.exec(res)[1];
				alert("title : " + title + "\nAuthor : " + author + "\nimg : " + img);
				if(cb){
					
					cb({title:title, author:author, img:img});
				}
			}
		});
		xhr.open("GET", url);
		xhr.send();
	}
	that.getDetail = getDetail;
}

module.exports = Board;