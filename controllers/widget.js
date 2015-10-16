var args = arguments[0] || {};

var images = [];
var previousIndex = 0;

exports.init = function (data) {
	var views = [];
	if(OS_ANDROID) {
		var imageBlob = Ti.UI.createImageView({image: data[0].image}).toBlob();
		var originalImageWidth = imageBlob.width;
		var originalImageHeight = imageBlob.height;
		var heightFullScreen = ((((Ti.Platform.displayCaps.platformWidth) / originalImageWidth) * originalImageHeight) / (Titanium.Platform.displayCaps.dpi / 160));
		$.view0.height = $.view1.height = heightFullScreen;
	}

	for (var i = 0, j = data.length; i < j; i++) {
		// generate image
		images.push(data[i].image);
		
		var content = data[i];
		
		if (args.font && !content.font){
			content.font = args.font;
		}
		if (args.color && !content.color){
			content.color = args.color;
		}
		
		if (args.titleFont && !content.titleFont){
			content.titleFont = args.titleFont;
		}
		if (args.titleColor && !content.titleColor){
			content.titleColor = args.titleColor;
		}

		// generate scrollableView children
		var contentView = Widget.createController('contentView', {data: content});
		
		views.push(contentView.getView());
	}

	$.view0.image = images[1];
	$.view1.image = images[0];

	$.description.setViews(views);
	$.description.addEventListener('scroll', scrollListener);
	$.description.addEventListener('scrollend', scrollendListener);
};

exports.detach = function () {
	$.description.removeEventListener('scroll', scrollListener);
	$.description.removeEventListener('scrollend', scrollendListener);
};

exports.moveNext = function(){
	$.description.moveNext();
};


function scrollListener(e) {
	if (e.currentPageAsFloat.toFixed(2) <= 0 || e.currentPageAsFloat.toFixed(2) >= images.length - 1) return false;
	var delta = Math.abs(previousIndex - e.currentPageAsFloat).toFixed(2);
	transition(e.currentPageAsFloat > previousIndex ? previousIndex + 1 : previousIndex - 1, 1 - delta);
}

function scrollendListener(e) {
	if (previousIndex === e.currentPage) return false;
	previousIndex = e.currentPage;

	$.view0.opacity = Math.round($.view0.opacity);
	$.view1.opacity = Math.round($.view1.opacity);

	var behind = parseInt($.view0.opacity) === 0 ? $.view0 : $.view1;
	var front = parseInt($.view0.opacity) === 0 ? $.view1 : $.view0;

	behind.zIndex = 0;
	front.zIndex = 1;
	$.trigger('page', e.currentPage);
}

function transition(nextIndex, opacity) {
	if (nextIndex < 0 || nextIndex > images.length - 1) return false;
	
	var front = $.view0.zIndex === 0 ? $.view1 : $.view0;
	if (front.opacity === opacity) return false;
	
	var behind = $.view0.zIndex === 0 ? $.view0 : $.view1;
	if (behind.opacity !== 1) behind.opacity = 1;
	if (behind.image !== images[nextIndex]) behind.image = images[nextIndex];
	
	front.animate({
		opacity : opacity
	}, function (e) {
		front.opacity = opacity;
	});
};

