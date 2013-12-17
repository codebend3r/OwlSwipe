var CS = {};


CS.init = function () {

    ko.applyBindings(CS.ViewModel());

    CS.initGallery();

};