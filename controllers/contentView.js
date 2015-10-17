var args = arguments[0] || {};

var data = args.data;

if (data.text){
	$.description.text = data.text;
}

if (data.color){
	$.description.color = data.color;
}

if (data.font){
	$.description.font = data.font;
}


if (data.titleColor){
	$.title.color = data.titleColor;
}

if (data.titleFont){
	$.title.font = data.titleFont;
}

if (data.title){
	$.title.text = data.title;
}
