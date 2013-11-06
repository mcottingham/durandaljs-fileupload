define(['services/datacontext', 'durandal/app'],
    function (datacontext, app) {
        var files = ko.observableArray([]);

        var activate = function () {
            var self = this;

            return Q.all([datacontext.query("Files")]).then(success, failure);

            function success(data) {
                self.files(data[0]);
            }

            function failure(error) {
                console.log(error);
                throw (error);
            }
        };

        var deleteFile = function (file) {
            app.showMessage("Are you sure you want to delete this file?", "Delete Confirmation", ["Yes", "No"]).then(function (choice) {
                if (choice == "Yes") {
                    files.remove(file);
                    file.entityAspect.setDeleted();
                    datacontext.saveChanges();
                }
            });
        };

        var vm = {
            activate: activate,
            deleteFile: deleteFile,
            files: files
        };
        return vm;
    }
);