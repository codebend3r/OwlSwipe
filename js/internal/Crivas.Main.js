var CS = {};


CS.init = function () {

    ko.applyBindings(CS.ViewModel());

    CS.initSwipe();

};

CS.initSwipe = function() {

    $('.swipe-area').owlmobileswipe({
        swipeLeft: function(distance) {
	        CS.output('SWIPED LEFT', distance);
        },
        swipeRight: function(distance) {
	        CS.output('SWIPED RIGHT', distance);
        },
	    swipeUp: function(distance) {
		    CS.output('SWIPED UP', distance);
	    },
	    swipeDown: function(distance) {
		    CS.output('SWIPED DOWN', distance);
	    },
	    noSwipe: function(distance) {
		    //CS.output('NO SWIPE', distance);
	    },
	    touchMove: function(distance) {
		    //CS.output('TOUCH MOVING', distance);
	    }
    });

};

CS.output = function(eventName, dis) {
	var outputString = eventName + ' --> x:' + dis.x + ', y: ' + dis.y;
	console.log(outputString);
	$('.output-container .output').text(outputString);
	//$('.swipe-area p').text(outputString);
};