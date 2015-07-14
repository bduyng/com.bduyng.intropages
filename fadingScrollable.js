//USAGE:
/*
	var data = 
	[
		{image:'1.png',text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
		{image:'2.png',text:'Ut enim ad minim veniam, quis nostrud exercitation ullamco.'},
		{image:'3.png',text:'Duis aute irure dolor in reprehenderit in voluptate velit esse.'}
	];

	var scroll = require('fadingScrollable')(data);
	win.add(scroll);
*/

module.exports = function(data) {
	var images = [];
	var views = [];
	var previousIndex = 0;

	var view = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});

	var view0 = Ti.UI.createImageView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		zIndex:0,
		opacity:1
	});
	var view1 = Ti.UI.createImageView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		zIndex:0,
		opacity:1
	});
	var description = Ti.UI.createScrollableView({
		width:'100%',
		height:'100%',
		showPagingControl:true,
		pagingControlColor:'transparent',
		zIndex:2
	});

	view.add(view0);
	view.add(view1);
	view.add(description);

	//INIT SCROLLABLE
	for (var i = 0; i < data.length; i++) {
		// generate image
		images.push(data[i].image);

		// generate scrollableView children
		var contentView = Ti.UI.createView();
		var txt = Ti.UI.createLabel({
			bottom:20,
			text:data[i].text,
			width:'90%',
			color:'white',
			font:{ fontSize : '20dp'},
			textAlign:'center'
		});
		contentView.add(txt);
		views.push(contentView);
	}
	view0.image = images[1];
	view1.image = images[0];

	description.setViews(views);
	description.addEventListener('scroll', scrollListener);
	description.addEventListener('scrollend', scrollendListener);
	

	function detach() {
		description.removeEventListener('scroll', scrollListener);
		description.removeEventListener('scrollend', scrollendListener);
	}

	function scrollListener(e) {
		if (e.currentPageAsFloat.toFixed(2) <= 0 || e.currentPageAsFloat.toFixed(2) >= images.length - 1) return false;
		var delta = Math.abs(previousIndex - e.currentPageAsFloat).toFixed(2);
		transition(e.currentPageAsFloat > previousIndex ? previousIndex + 1 : previousIndex - 1, 1 - delta);
	}

	function scrollendListener(e) {
		if (previousIndex === e.currentPage) return false;
		previousIndex = e.currentPage;

		view0.opacity = Math.round(view0.opacity);
		view1.opacity = Math.round(view1.opacity);

		var behind = parseInt(view0.opacity) === 0 ? view0 : view1;
		var front = parseInt(view0.opacity) === 0 ? view1 : view0;

		behind.zIndex = 0;
		front.zIndex = 1;
	}

	function transition(nextIndex, opacity) {
		if (nextIndex < 0 || nextIndex > images.length - 1) return false;
		
		var front = view0.zIndex === 0 ? view1 : view0;
		if (front.opacity === opacity) return false;
		
		var behind = view0.zIndex === 0 ? view0 : view1;
		if (behind.opacity !== 1) behind.opacity = 1;
		if (behind.image !== images[nextIndex]) behind.image = images[nextIndex];
		
		front.animate({
			opacity : opacity
		}, function (e) {
			front.opacity = e.source.opacity;
		})
	}

	return view;
}