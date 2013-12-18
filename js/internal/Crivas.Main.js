var CS = {};


CS.init = function () {

    ko.applyBindings(CS.ViewModel());

    CS.initSwipe();

};

CS.initSwipe = function() {

    $('.swipe-area').owlmobileswipe({
        swipeLeft: function() {

        },
        swipeRight: function() {

        }
    });

};