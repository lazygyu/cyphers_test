// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var Board = require('board');
var bbs = new Board();
// create tab group
//var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

var view = Ti.UI.createView({
	backgroundColor:'transparent',
	top:0,
	left:0,
	width:'100%',
	height:'100%',
	layout:'vertical'
});

var imgList = Ti.UI.createTableView({
	rowHeight : "30dp"
});

win1.addEventListener("open", function(e){
	
	bbs.getList(function(lst){
		var tdata = [];
		for(var i=0,l=lst.length;i<l;i++){
			var row = Ti.UI.createTableViewRow({
				height:"80dp",
				rowIndex:i,
				idx:lst[i].idx
			});
			
			var thumb = Ti.UI.createImageView({
				image:lst[i].leftImage,
				left:"10dp",
				top:"5dp",
				width:"70dp", height:"70dp"
			});
			
			var labelTitle = Ti.UI.createLabel({
				color:"#222",
				font:{fontWeight:"bold", fontSize:30},
				text:lst[i].title,
				left:"90dp",
				top:"5dp",
				width:'auto'
			});
			
			row.add(thumb);
			row.add(labelTitle);
			tdata.push(row);
			row.addEventListener("click", function(e){
				alert(e.row.idx);
				bbs.getDetail(e.row.idx);
			});
		}
		imgList.setData(tdata);
		
	});
	
});


view.add(imgList);
win1.add(view);
win1.open();
