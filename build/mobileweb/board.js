function Board(){
	var that = this;
	this.page = 1;
	this.url = "http://df.nexon.com/?GO=knowledge|ucc&TO=all&mode={mode}";
	
	var getList = function(){
		var url = that.url.replace("{mode}", "list");
		var xhr = Ti.Network.createHTTPClient({
			onload:function(e){
				var listrx = /<tr>[\t\s\n\r ]*<td width='51' height='28' align='center' class='ex_bbs03'><a href='#' onclick="search_category\('[0-9]'\); return false;" class = 'ex_bbs03'><span style='font-size:11px'>\[([^\]]+)\]<\/span>/gi;
				Ti.API.debug(this.responseText);
				if(listrx.test(this.responseText)){
					
					alert(this.responseText);
				}else{
					alert("It's weired!");
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
}

module.exports = Board;