define(['durandal/app', 'services/datacontext', 'plugins/router'],
    function (app, datacontext, router) {
        var file = ko.observable();

        var saveFile = function () {
            datacontext.saveChanges().then(saved, failure);

            function saved() {
                router.navigate('#files');
            }

            function failure(error) {
                console.log(error);
            }
        };

        var activate = function () {
            file(datacontext.createEntity("File"));
            return true;
        };

        var deactivate = function () {
            if (datacontext.hasChanges()) {
                datacontext.cancelChanges();
            }
        };

        var fileUploaded = function (e) {
            file().filename(e.response);
        };

        var verifyFileUpload = function (e) {
            if ((e.files[0].size / 1048576) > 12 || e.files[0].extension != '.png') {
                e.preventDefault();
                app.showMessage("File uploaded is either larger than 12MB, or does not have extension .png.  Please try again.", "Invalid File", ["Ok"]);
            }
        };

        var vm = {
            activate: activate,
            deactivate: deactivate,
            fileUploaded: fileUploaded,
            verifyFileUpload: verifyFileUpload,
            saveFile: saveFile,
            file: file
        };

        return vm;
    }
);