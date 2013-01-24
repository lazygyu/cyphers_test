// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

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

var label1 = Titanium.UI.createLabel({
	color:'#333',
	text:'FinishIt sign in',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var in_userid = Titanium.UI.createTextField({
	width:'50dp'
});

label1.addEventListener("click", function(e){
	var Board = require('board');
	var bbs = new Board();
	bbs.getList();
});

view.add(label1);
view.add(in_userid);

win1.add(view);
win1.open();
