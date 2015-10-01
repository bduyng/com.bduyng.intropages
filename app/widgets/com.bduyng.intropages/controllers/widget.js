var images = [];
var previousIndex = 0;

exports.init = function (data) {
	var views = [];

	for (var i = 0, j = data.length; i < j; i++) {
		// generate image
		images.push(data[i].image);

		// generate scrollableView children
		var contentView = Ti.UI.createView();
		contentView.add(Ti.UI.createLabel({
			text : data[i].text,
			color : 'white',
			font : {
				fontFamily : 'Quicksand',
				fontSize : '20sp'
			},
			textAlign : 'center'
		}))
		views.push(contentView);
	}

	$.view0.image = images[1];
	$.view1.image = images[0];

	$.description.setViews(views);
	$.description.addEventListener('scroll', scrollListener);
	$.description.addEventListener('scrollend', scrollendListener);

}

exports.detach = function () {
	$.description.removeEventListener('scroll', scrollListener);
	$.description.removeEventListener('scrollend', scrollendListener);
}

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
		front.opacity = e.source.opacity;
	})
}
