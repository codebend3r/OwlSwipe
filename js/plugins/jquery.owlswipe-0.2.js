/*
 * Owl Swipe
 * crivas.net
 *
 * Author: Chester Rivas
 * Version: 0.2
 */

var Owl = Owl || {};

Owl.swipeEvents = {};
Owl.swipeEvents.SWIPE_LEFT = 'swipe_left';
Owl.swipeEvents.SWIPE_RIGHT = 'swipe_right';
Owl.swipeEvents.TOUCH_MOVE = 'touch_move';
Owl.swipeEvents.TOUCH_MOVE_LEFT = 'touch_move_left';
Owl.swipeEvents.TOUCH_MOVE_RIGHT = 'touch_move_right';

$.fn.owlmobileswipe = function (options) {

    var settings = $.extend({
        // These are the defaults.
        event: '',
        callback: null,
        bufferX: 50,
        bufferY: 50,
        minMovementX: 50,
        minMovementY: 50
    }, options);

    var $this = this,
        touchStart = {x: 0, y: 0},
        touchEnd = {x: 0, y: 0},
        diffAbs = {x: 0, y: 0},
        diff = {x: 0, y: 0},
        touchXExceeded = false,
        touchYExceeded = false,
        dispatchEvent = false,
        callStackCounter = 0;

    var initDetection = function () {
        console.log('initDetection');
        // bind passed in event to callback
        $this.on(settings.event, settings.callback);
        $this.on('touchstart', onTouchStart);
    };

    var onTouchStart = function (e) {
        console.log('onTouchStart');
        touchStart.x = touchEnd.x = e.originalEvent.touches[0].pageX;
        touchStart.y = touchEnd.y = e.originalEvent.touches[0].pageY;
        touchXExceeded = false;
        touchYExceeded = false;
        dispatchEvent = false;
        $this.on('touchend', onTouchEnd);
        $this.on('touchmove', onTouchMove);
    };

    var onTouchMove = function (e) {
        console.log('onTouchMove');
        touchEnd.x = e.originalEvent.touches[0].pageX;
        touchEnd.y = e.originalEvent.touches[0].pageY;
        diff.x = touchEnd.x - touchStart.x;
        diff.y = touchEnd.y - touchStart.y;
        diffAbs.x = Math.abs(touchEnd.x - touchStart.x);
        diffAbs.y = Math.abs(touchEnd.y - touchStart.y);
        if (diffAbs.y < settings.bufferY && diffAbs.x > settings.minMovementX) {
            touchXExceeded = true;
            //callStackCounter += 1;
            if (diff.x < 0 && settings.event == Owl.swipeEvents.TOUCH_MOVE) {
                dispatchEvent = true;
                $this.trigger(settings.event, [diff]);
                e.preventDefault();
            }
            if (diff.x < 0 && settings.event == Owl.swipeEvents.TOUCH_MOVE_LEFT) {
                dispatchEvent = true;
                $this.trigger(settings.event, [diff]);
                e.preventDefault();

            } else if (diff.x > 0 && settings.event == Owl.swipeEvents.TOUCH_MOVE_RIGHT) {
                dispatchEvent = true;
                $this.trigger(settings.event, [diff]);
                e.preventDefault();
            }
        }
    };

    var onTouchEnd = function (e) {
        console.log('onTouchEnd');
        $this.off('touchmove touchend');
        if (diffAbs.y < settings.bufferY && diffAbs.x > settings.minMovementX) {
            $this.trigger(settings.event, [diff]);
            if (diff.x < 0 && settings.event == Owl.swipeEvents.SWIPE_LEFT) {
                dispatchEvent = true;
                e.preventDefault();
                $this.trigger(settings.event, [diff]);
            } else if (diff.x > 0 && settings.event == Owl.swipeEvents.SWIPE_RIGHT) {
                dispatchEvent = true;
                e.preventDefault();
                $this.trigger(settings.event, [diff]);
            }
        }
    };

    initDetection();


};