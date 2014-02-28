CS.ViewModel = function () {

    var self = this;

    self.optionsList = ko.observableArray(ko.utils.arrayMap(CS.documentation.options, function (i) {
        return {
            key: '<b>' + i.key + '</b>',
            defaultValue: i.defaultValue,
            paramsExist: i.paramsExist,
            params: ko.utils.arrayMap(i.params, function (j) {
                if (!j) {
                    return {
                        functionExample: ko.computed(function(){
                            return i.key + ': function(){...}';
                        })
                    }
                } else {
                    return {
                        name: j.name,
                        description: j.description,
                        functionExample: ko.computed(function() {
                            return i.key + ': function( ' + j.name + ' ){...}';
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