define([],
    function () {
        var datacontext = null;
        var store = null;

        var initialize = function (context) {
            datacontext = context;
            store = datacontext.metadataStore;
        };

        var addValidators = function () {
        };

        var vm = {
            initialize: initialize,
            addValidators: addValidators
        };

        return vm;
    }
);