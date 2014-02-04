var CS = {};


CS.init = function () {

    ko.applyBindings(CS.ViewModel());

    CS.initSwipe();

};

CS.initSwipe = function() {

    $('.swipe-area').owlswipe({
        swipeUp: function(distance) {
	        CS.output('SWIPED UP');
        },
        swipeDown: function(distance) {
	        CS.output('SWIPED DOWN');
        },
        swipeLeft: function(distance) {
	        CS.output('SWIPED LEFT');
        },
        swipeRight: function(distance) {
	        CS.output('SWIPED RIGHT');
        }
    });

};

CS.output = function(output) {
	$('.output-container .output').text(output);
	$('.swipe-area p').text(output);
};