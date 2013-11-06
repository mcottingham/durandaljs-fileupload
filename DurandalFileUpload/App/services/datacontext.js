define(['services/model', 'durandal/app'],
    function (model, app) {
        var configureBreeze = function () {
            breeze.NamingConvention.camelCase.setAsDefault();

            // configure to resist CSRF attack
            var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();
            if (antiForgeryToken) {
                // get the current default Breeze AJAX adapter & add header
                var ajaxAdapter = breeze.config.getAdapterInstance("ajax");
                ajaxAdapter.defaultSettings = {
                    headers: {
                        '__RequestVerificationToken': antiForgeryToken
                    },
                };
            }
        };

        var primeData = function () {
            return manager.fetchMetadata().then(model.addValidators, failure);

            function failure(error) {
                console.log(error);
                throw(error);
            }
        };

        var createEntity = function (entityName) {
            return manager.createEntity(entityName);
        };

        var saveChanges = function (entities) {
            return manager.saveChanges(entities).then(saveSuccess, saveFailure);

            function saveSuccess() {
                console.log("Save Success!");
            }

            function saveFailure(error) {
                console.log("Save Failure!");
                app.showMessage("Save Failed", "Failure", ["Ok"]);
                throw (error);
            }
        };

        var query = function (entitySet) {
            var deferred = new Q.defer();

            var q = breeze.EntityQuery.from(entitySet);
            manager.executeQuery(q).then(success, failure);

            function success(data) {
                console.log("Successfully got " + data.results.length + " results");
                deferred.resolve(data.results);
            }

            function failure(error) {
                console.log("Error getting data!");
                throw (error);
            }

            return deferred.promise;
        };

        var cancelChanges = function () {
            manager.rejectChanges();
            console.log("Cancelled Changes");
        };

        var hasChanges = ko.observable(false);

        configureBreeze();

        var manager = new breeze.EntityManager("/api/db");
        manager.hasChangesChanged.subscribe(function (eventArgs) {
            hasChanges(eventArgs.hasChanges);
        });

        model.initialize(manager);

        var vm = {
            manager: manager,
            primeData: primeData,
            createEntity: createEntity,
            saveChanges: saveChanges,
            cancelChanges: cancelChanges,
            hasChanges: hasChanges,
            query: query
        };

        return vm;
    }
);