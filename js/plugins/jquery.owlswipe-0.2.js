/*
 * Owl Swipe
 * crivas.net
 *
 * Author: Chester Rivas
 * Version: 0.2.1
 */

var Owl = Owl || {};

Owl.events = Owl.events || {};
Owl.events.SWIPE = 'swipe';
Owl.events.SWIPE_LEFT = 'swipe_left';
Owl.events.SWIPE_RIGHT = 'swipe_right';
Owl.events.SWIPE_UP = 'swipe_up';
Owl.events.SWIPE_DOWN = 'swipe_down';
Owl.events.TOUCH_MOVE = 'touch_move';
Owl.events.TOUCH_MOVE_LEFT = 'touch_move_left';
Owl.events.TOUCH_MOVE_RIGHT = 'touch_move_right';
Owl.events.TOUCH_MOVE_UP = 'touch_move_up';
Owl.events.TOUCH_MOVE_DOWN = 'touch_move_down';
Owl.events.NO_SWIPE = 'no_swipe';

$.fn.owlmobileswipe = function (options) {

    var settings = $.extend({
        // These are the defaults.
        swipe: function(){},
        swipeLeft: function(){},
        swipeRight: function(){},
        swipeUp: function(){},
        swipeDown: function(){},
	    touchMove: function(){},
	    touchMoveLeft: function(){},
	    touchMoveRight: function(){},
	    touchMoveUp: function(){},
	    touchMoveDown: function(){},
	    noSwipe: function(){},
        bufferX: 50,
        bufferY: 50,
        minMovementX: 75,
        minMovementY: 75,
        swipeTimeout: 3000
    }, options);

    var $this = this,
        self = {},
        touchStart = {x: 0, y: 0},
        touchEnd = {x: 0, y: 0},
	    distanceAbs = {x: 0, y: 0},
        distance = {x: 0, y: 0},
        touchXExceeded = false,
        touchYExceeded = false,
        dispatchSwipeEvent = false,
	    swipeTimer,
        callStackCounter = 0;

	self.initDetection = function () {

		$this.on(Owl.events.SWIPE, function(e, d){
			settings.swipe.call(settings, d);
		});

        $this.on(Owl.events.SWIPE_LEFT, function(e, d){
	        settings.swipeLeft.call(settings, d);
        });

		$this.on(Owl.events.SWIPE_RIGHT, function(e, d){
			settings.swipeRight.call(settings, d);
		});

		$this.on(Owl.events.SWIPE_UP, function(e, d){
			settings.swipeUp.call(settings, d);
		});

		$this.on(Owl.events.SWIPE_DOWN, function(e, d){
			settings.swipeDown.call(settings, d);
		});

		$this.on(Owl.events.TOUCH_MOVE, function(e, d){
			settings.touchMove.call(settings, d);
		});

		$this.on(Owl.events.TOUCH_MOVE_LEFT, function(e, d){
			settings.touchMoveLeft.call(settings, d);
		});

		$this.on(Owl.events.TOUCH_MOVE_RIGHT, function(e, d){
			settings.touchMoveRight.call(settings, d);
		});

		$this.on(Owl.events.TOUCH_MOVE_UP, function(e, d){
			settings.touchMoveUp.call(settings, d);
		});

		$this.on(Owl.events.TOUCH_MOVE_DOWN, function(e, d){
			settings.touchMoveDown.call(settings, d);
		});

		$this.on(Owl.events.NO_SWIPE, function(e, d){
			settings.noSwipe.call(settings, d);
		});

        $this.on('touchstart', self.onTouchStart);

    };

	self.onTouchStart = function (e) {
        //console.log('self.onTouchStart');
        touchStart.x = touchEnd.x = e.originalEvent.touches[0].pageX;
        touchStart.y = touchEnd.y = e.originalEvent.touches[0].pageY;
        touchXExceeded = false;
        touchYExceeded = false;
		dispatchSwipeEvent = true;
        $this.on('touchend', self.onTouchEnd);
        $this.on('touchmove', self.onTouchMove);
		clearTimeout(swipeTimer);
		swipeTimer = setTimeout(function(){
			dispatchSwipeEvent = false;
		}, settings.swipeTimeout);
    };

	self.onTouchMove = function (e) {

        //console.log('onTouchMove');
        touchEnd.x = e.originalEvent.touches[0].pageX;
        touchEnd.y = e.originalEvent.touches[0].pageY;
        distance.x = touchEnd.x - touchStart.x;
        distance.y = touchEnd.y - touchStart.y;
        distanceAbs.x = Math.abs(touchEnd.x - touchStart.x);
        distanceAbs.y = Math.abs(touchEnd.y - touchStart.y);

	    if (distanceAbs.y > settings.bufferY || distanceAbs.x > settings.bufferY) {
		    $this.trigger(Owl.events.TOUCH_MOVE, [distance]);
		    e.preventDefault();
	    }

        if (distanceAbs.y < settings.bufferY && distanceAbs.x > settings.minMovementX) {

            if (distance.x < 0) {
	            $this.trigger(Owl.events.TOUCH_MOVE_LEFT, [distance]);
                e.preventDefault();
            } else if (distance.x > 0) {
	            $this.trigger(Owl.events.TOUCH_MOVE_RIGHT, [distance]);
                e.preventDefault();
            }

        } else if (distanceAbs.x < settings.bufferX && distanceAbs.y > settings.minMovementY) {

	        if (distance.y < 0) {
		        $this.trigger(Owl.events.TOUCH_MOVE_UP, [distance]);
		        e.preventDefault();
	        } else if (distance.y > 0) {
		        $this.trigger(Owl.events.TOUCH_MOVE_DOWN, [distance]);
		        e.preventDefault();
	        }

        }
    };

	self.onTouchEnd = function (e) {
		//console.log('onTouchEnd');
		$this.off('touchmove touchend');
		if (dispatchSwipeEvent) {

			$this.trigger(Owl.events.SWIPE, [distance]);

			if (distanceAbs.y < settings.bufferY && distanceAbs.x > settings.minMovementX) {

				if (distance.x < 0) {
					$this.trigger(Owl.events.SWIPE_LEFT, [distance]);
					e.preventDefault();
				} else if (distance.x > 0) {
					$this.trigger(Owl.events.SWIPE_RIGHT, [distance]);
					e.preventDefault();
				}

			} else if (distanceAbs.x < settings.bufferX && distanceAbs.y > settings.minMovementY) {

				if (distance.y < 0) {
					$this.trigger(Owl.events.SWIPE_UP, [distance]);
					e.preventDefault();
				} else if (distance.y > 0) {
					$this.trigger(Owl.events.SWIPE_DOWN, [distance]);
					e.preventDefault();
				}

			} else {

				$this.trigger(Owl.events.NO_SWIPE, [distance]);

			}

		}
	};

	self.initDetection();


};