////////////////////////////////////////////////////////////////////////////////
// Init
////////////////////////////////////////////////////////////////////////////////

(function constructor() {
    $.lastPage = $.titlesContainer.currentPage;
    if ($.args.views && $.args.views.length) generateViews($.args.views);
    else console.error('"views" argument is required.');
})();

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////

function generateViews(views) {
    var scrollableChildViews = [];

    for (var i = views.length - 1; i >= 0; i--) {
        var view = views[i];
        var title, description;

        // Add all titles and descriptions into a scrollable view
        if (view.title) {
            title = Ti.UI.createLabel({ role: 'title', text: view.title });
            if ($.args.titles) title.applyProperties($.args.titles);
        }

        if (view.description) {
            description = Ti.UI.createLabel({ role: 'description', text: view.description });
            if ($.args.descriptions) description.applyProperties($.args.descriptions);
        }

        var scrollableChildView = Ti.UI.createView();
        title && scrollableChildView.add(title);
        description && scrollableChildView.add(description);
        scrollableChildViews.push(scrollableChildView);

        // Generate background image
        if (view.media) {
            $['view' + i] = Ti.UI.createImageView({
                index: i,
                image: view.media,
                width: Ti.UI.FILL, height: Ti.UI.FILL
            });
        }

        // Add background image into the container in reverse order.
        // For example, [3, 2, 1]. 1 is the on top view because it is added last.
        $['view' + i] && $.backgroundsContainer.add($['view' + i]);
    }

    // Make sure the titles views is added in correct order.
    // For example, [1, 2, 3]
    $.titlesContainer.views = scrollableChildViews.reverse();
}

////////////////////////////////////////////////////////////////////////////////
// Event Handlers
////////////////////////////////////////////////////////////////////////////////

/**
 * Logic of transition of backgrounds
 * For example: [3, 2, 1] (1 on top, 3 on bottom), then user is on page 2 currently
 * if slide forward, we fade out 2 => 3 will be show up
 * if slide backward, we fade in 1 => 1 will be show up :)
 */
function onScroll(e) {
    // No effect when scrolling out of bound
    if (e.currentPageAsFloat < 0 ||
        e.currentPageAsFloat > e.source.views.length - 1
    ) return false;

    var delta = e.currentPageAsFloat - Math.floor(e.currentPageAsFloat);
    if (delta) delta = 1 - delta;

    if (e.currentPageAsFloat > $.lastPage) {
        // Go forward ==> fade out current page
        $['view' + $.lastPage].opacity = delta;
    }
    else if (e.currentPageAsFloat < $.lastPage) {
        // Make sure last page index always >= 0
        // Fade in the previous page
        var previousPage = !$.lastPage ? 0 : $.lastPage - 1;
        if (!delta) delta = 1;
        $['view' + previousPage].opacity = delta;
    }

    if (e.currentPageAsFloat === e.currentPage) {
        // when the scrolling is finished
        $.lastPage = e.currentPage;
    }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
$.open = $.container.open;

$.close = function() {
    // clean up all listeners
    $.removeListener();

    $.container.close();
};

$.moveNext = $.titlesContainer.moveNext;

$.movePrevious = $.titlesContainer.movePrevious;
