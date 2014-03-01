
CS.documentation = {

    options: [
		{
			key: 'swipe',
			defaultValue: 'null',
			params: [
				{
					name: 'distance',
					description: 'An object containing x and y properties representing the distance traveled in both directions.'
				}
			],
			type: 'Function',
			description: 'A callback function that\'s triggered when a swiping motion is detected in any direction.',
			required: false
		},
        {
            key: 'swipeLeft',
            defaultValue: 'null',
            params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
            type: 'Function',
            description: 'A callback function that\'s triggered when a swiping left motion is detected.',
            required: false
        },
	    {
		    key: 'swipeRight',
		    defaultValue: 'null',
		    params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when a swiping left motion is detected.',
		    required: false
	    },
	    {
		    key: 'swipeUp',
		    defaultValue: 'null',
		    params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when a swiping up motion is detected.',
		    required: false
	    },
	    {
		    key: 'swipeDown',
		    defaultValue: 'null',
		    params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when a swiping down motion is detected.',
		    required: false
	    },
	    {
		    key: 'touchMove',
		    defaultValue: 'null',
		    params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when finger is currently moving on touch devices in any direction.',
		    required: false
	    },
	    {
		    key: 'touchMoveLeft',
		    defaultValue: 'null',
		    params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when finger is currently moving left.',
		    required: false
	    },
	    {
		    key: 'touchMoveRight',
		    defaultValue: 'null',
		    params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when finger is currently moving right.',
		    required: false
	    },
	    {
		    key: 'touchMoveUp',
		    defaultValue: 'null',
		    params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when finger is currently moving up.',
		    required: false
	    },
	    {
		    key: 'touchMoveDown',
		    defaultValue: 'null',
		    params: [{
				name: 'distance',
				description: 'An object containing x and y properties representing the distance traveled in both directions.'
			}],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when finger is currently moving down.',
		    required: false
	    },
	    {
		    key: 'touchStop',
		    defaultValue: 'null',
		    params: [],
		    type: 'Function',
		    description: 'A callback function that\'s triggered when you have stopped touching the screen regardless if you made a movement or not. Indepenent from <code>maxClickDelay</code> value.',
		    required: false
	    },
        {
            key: 'noSwipe',
            defaultValue: 'null',
            params: [],
            type: 'Function',
            description: 'A callback function that\'s triggered when a swipe is started and not completed. Either because of an error or not enough pixels were swiped vertically or hozintally.<br><br>' +
                'Based on <code>minMovementX</code> and <code>minMovementY</code>.',
            required: false
        },
        {
            key: 'longPress',
            defaultValue: 'null',
            params: [],
            type: 'Function',
            description: 'A callback function that\'s triggered when there is no movement and you have pressed down for longer than the <code>maxClickDelay</code> value. In other words a long press.',
            required: false
        },
	    {
		    key: 'bufferX',
		    defaultValue: '50',
            params: [],
		    type: 'Number',
		    description: 'The distance in pixels your finger can deviate while swiping vertically.',
		    required: false
	    },
	    {
		    key: 'bufferY',
		    defaultValue: '50',
            params: [],
		    type: 'Number',
		    description: 'The distance in pixels your finger can deviate while swiping horizontally.',
		    required: false
	    },
	    {
		    key: 'minMovementX',
		    defaultValue: '75',
            params: [],
		    type: 'Number',
		    description: 'The minimum amount of pixels along the x axis in order to trigger a swipe movement.',
		    required: false
	    },
	    {
		    key: 'minMovementY',
		    defaultValue: '75',
            params: [],
		    type: 'Number',
		    description: 'The minimum amount of pixels along the y axis in order to trigger a swipe movement.',
		    required: false
	    },
	    {
		    key: 'swipeTimeout',
		    defaultValue: '3000',
            params: [],
		    type: 'Number',
		    description: 'The amount of time in milliseconds to timeout/cancel the swipe if your finger doesn\t move more than the value or <code>minMovementX</code> or <code>minMovementY</code>.',
		    required: false
	    },
        {
            key: 'longPressDelay',
            defaultValue: '4000',
            params: [],
            type: 'Number',
            description: 'The amount of time in milliseconds that needs to pass without any movement in order to trigger the long press event.',
            required: false
        }


    ],
	
	events: [
	]

};