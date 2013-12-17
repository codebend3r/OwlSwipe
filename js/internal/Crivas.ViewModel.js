CS.ViewModel = function () {

    var self = this;

    self.imagesList = ko.observable(CS.imagesList.images);
    //self.optionsList = ko.observable(CS.documentation.options);
    self.optionsList = ko.observableArray(ko.utils.arrayMap(CS.documentation.options, function (i) {
        return {
            key: '<b>' + i.key + '</b>',
            defaultValue: i.defaultValue,
            type: i.type,
            description: i.description,
            required: i.required ? '<span class="true">true</span>' : '<span class="false">false</span>'
        };
    }));

    self.eventsList = ko.observableArray(ko.utils.arrayMap(CS.documentation.events, function (i) {
        return {
            eventName: i.eventName,
            description: i.description,
            target: i.target
        };
    }));

    return self;

};