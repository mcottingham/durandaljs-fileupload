define([],
    function () {
        ko.bindingHandlers.upload = {
            init: function (elem, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                $(elem).kendoUpload(options);
            }
        };
    }
);