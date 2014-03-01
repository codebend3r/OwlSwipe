CS.ViewModel = function () {

    var self = this;

    self.optionsList = ko.observableArray(ko.utils.arrayMap(CS.documentation.options, function (i) {
        return {
            key: '<b>' + i.key + '</b>',
            defaultValue: i.defaultValue,
            paramsExist: i.paramsExist,
            params: ko.computed(function(){

                console.log('i.params.length', i.params.length);
                console.log('i.type', i.type);
                console.log('===================');

                if (i.params.length == 0 && i.type == 'Function') {
                    //console.log('Function Without Params');
                    return {
                        name: 'elephant',
                        description: 'giraffe',
                        functionExample: ko.computed(function() {
                            return i.key + ': function( ){...}';
                        })
                    }
                } else if (i.params.length > 0 && i.type == 'Function') {
                    //console.log('Function W/ Params');
                    ko.utils.arrayMap(i.params, function (j) {
                        return {
                            name: j.name,
                            description: j.description,
                            functionExample: ko.computed(function() {
                                return i.key + ': function( ' + j.name + ' ){...}';
                            })
                        };
                    })
                } else {
                    //console.log('Ignore');
                    return {
                        name: 'dog',
                        description: 'cat',
                        functionExample: ko.computed(function() {
                            return i.key + ': boo( ){...}';
                        })
                    };
                }

            }),
            type: i.type,
            description: i.description,
            required: i.required ? '<span class="true">true</span>' : '<span class="false">false</span>'
        };
    }));

    self.eventsList = ko.observableArray(ko.utils.arrayMap(CS.documentation.events, function (i) {
        return {
            eventName: i.eventName,
            constant: i.constant,
            description: i.description,
            eventParams: ko.utils.arrayMap(i.eventParams, function (j) {
                if (!j) {
                    return {
                        functionExample: ko.computed(function(){
                            return 'function(' + j.name + ' )'
                        })
                    }
                } else {
                    return {
                        name: j.name,
                        value: j.value,
                        functionExample: ko.computed(function(){
                            return 'function(' + j.name + ' )'
                        })
                    };
                }
            })
        };
    }));

    return self;

};