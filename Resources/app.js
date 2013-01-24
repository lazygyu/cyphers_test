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
    title:'cyphers fan arts',
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


var dview =  Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true,
  layout:'vertical'
});

var dimg = Ti.UI.createImageView({
	
});

var dtitle = Ti.UI.createLabel({
	font:{fontSize:30, fontWeight:'bold' },
	color:'#000'
});

var dcontent = Ti.UI.createLabel({
	
});

var dbtn = Ti.UI.createButton({
	title:'닫기'
});

dbtn.addEventListener("click", function(){
	dview.hide();
	view.show();
});

dview.add(dtitle);
dview.add(dimg);
dview.add(dcontent);
dview.add(dbtn);
dview.hide();




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
			
		}
		imgList.setData(tdata);
		imgList.addEventListener("click", function(e){
				
			bbs.getDetail(e.rowData.idx, function(data){
				dtitle.setText(data.title);
				dcontent.setText(data.author);
				dimg.setImage(data.img);
				view.hide();
				dview.show();
			});
		});
	});
	
});


view.add(imgList);
win1.add(view);
win1.add(dview);
win1.open();

