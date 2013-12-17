$.fn.mobileswipe = function (options) {

    var settings = $.extend({
        // These are the defaults.
        event: '',
        callback: null
    }, options);

    var $this = this,
        touchStart = {x:0, y:0},
        touchEnd = {x:0, y:0},
        diffAbs = {x:0, y:0},
        diff = {x:0, y:0},
        threshold = 50,
        touchXExceeded = false,
        touchYExceeded = false,
        dispatchEvent = false,
        callStackCounter = 0;

    var initDetection = function() {
        // bind passed in event to callback
        $this.on(settings.event, settings.callback);
        $this.on('touchstart', onTouchStart);
    };

    var onTouchStart = function(e) {
        touchStart.x = touchEnd.x = e.originalEvent.touches[0].pageX;
        touchStart.y = touchEnd.y = e.originalEvent.touches[0].pageY;
        touchXExceeded = false;
        touchYExceeded = false;
        dispatchEvent = false;
        $this.on('touchend', onTouchEnd);
        $this.on('touchmove', onTouchMove);
    };

    var onTouchMove = function(e) {
        touchEnd.x = e.originalEvent.touches[0].pageX;
        touchEnd.y = e.originalEvent.touches[0].pageY;
        diff.x = touchStart.x - touchEnd.x;
        diff.y = touchStart.y - touchEnd.y;
        diffAbs.x = Math.abs(touchStart.x - touchEnd.x);
        diffAbs.y = Math.abs(touchStart.y - touchEnd.y);
        if (touchXExceeded == false && diffAbs.y < 10 && diffAbs.x > threshold) {
            touchXExceeded = true;
            callStackCounter += 1;
            if (diff.x > 0) {
                if (settings.event == 'swipeleft') {
                    //console.log('LEFT', settings.event);
                    dispatchEvent = true;
                    e.preventDefault();
                    //console.log('TRIGGER', settings.event);
                    $this.trigger(settings.event);
                }
            } else if (diff.x < 0) {
                if (settings.event == 'swiperight') {
                    //console.log('RIGHT', settings.event);
                    dispatchEvent = true;
                    e.preventDefault();
                    //console.log('TRIGGER', settings.event);
                    $this.trigger(settings.event);
                }
            }
        }
    };

    var onTouchEnd = function(e) {
        //console.log('TOUCH ENDED');
        $this.off('touchmove touchend');
    };

    initDetection();


};