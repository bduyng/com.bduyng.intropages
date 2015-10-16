####  WARNING: 3.0 IS NOT BACKWARDS COMPATIBLE WITH 2.1

# Alloy Intro Pages [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

An [Alloy](http://appcelerator.com/alloy) [Widget](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Widgets) to to create welcome pages like [AirBnB](https://itunes.apple.com/us/app/airbnb/id401626263?mt=8) application.

* Source code: [https://github.com/bduyng/com.bduyng.intropages/tree/master](https://github.com/bduyng/com.bduyng.intropages/tree/master)
* Test app: [https://github.com/bduyng/com.bduyng.intropages/tree/test](https://github.com/bduyng/com.bduyng.intropages/tree/test)

### Screenshot
![Screenshot](https://github.com/bduyng/com.bduyng.intropages/blob/test/demo.gif?raw=true)

## Get it [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/com.bduyng.intropages)

Install via [gitTio](http://gitt.io/component/com.bduyng.intropages):

	$ gittio install com.bduyng.intropages

Or download a [release](https://github.com/bduyng/com.bduyng.intropages/releases), extract it to your app's `app/widgets/com.bduyng.intropages` folder and add the dependency to your `config.json`:

	{
		..
		"dependencies": {
			"com.bduyng.intropages": "*",
			"au.jkotchoff.scrollableView": "*"
			..
		}
	}	

## Use it

Feel free to modify if needed.
Requires `au.jkotchoff.scrollableView` to be installed too.

### index.xml

	<Alloy>
		<Window>
			<Widget src="com.bduyng.intropages" id="introPages" onPage="newPage"></Widget>
		</Window>
	</Alloy>

### index.tss

	"#introPages": {
		color: '#666666',
		titleColor: '#333333',
		font: {
			fontFamily: 'Quicksand',
			fontSize: 14
		},
		titleFont: {
			fontFamily: 'Quicksand',
			fontSize: 19
		}
	}


### index.js
    var data = [
		{
			image : "1.png",
			text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			title: "Title 1"
		},
		{
			image : "2.png",
			text : "Ut enim ad minim veniam, quis nostrud exercitation ullamco."
		},
		{
			image : "3.png",
			text : "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
			title: "Title 3"
		}
	];

	$.introPages.init(data);

	$.getView().open();
	
	function newPage(page){
		// calls this function when a new page is loaded
	}
	
	// two functions below require the latest version `au.jkotchoff.scrollableView`
	
	// function dedicated to programmatically move to the next page, useful for "next" buttons
	function goToNext(){
		$.introPages.moveNext();
	}
	// function dedicated to programmatically move to the previous page, useful for "previous" buttons
	function goToPrevious(){
		$.introPages.movePrevious();
	}

## Changelog

* 1.0.0 Initial version
* 2.0.0 Add Android Support with [ScrollableView widget](https://github.com/jkotchoff/au.<jkotchoff class="scro"></jkotchoff>llableView)
* 2.1.0 Fix ImageView aspect ratio in Android
* 3.0.0 Complete overhaul of the widget, added customisation and cleaned up code. Not backwards compatible, as the widget main view is no longer a Window. 
 
## License

	The MIT License (MIT)
	
	Copyright (c) 2015 Duy Bao Nguyen
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
