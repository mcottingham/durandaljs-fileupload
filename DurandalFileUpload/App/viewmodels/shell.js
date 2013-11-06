define(['plugins/router', 'durandal/app', 'services/datacontext', 'services/bindings'], function (router, app, datacontext) {
    return {
        router: router,
        search: function () {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            return datacontext.primeData().then(boot, failure);

            function failure(error) {
                console.log(error);
                throw (error);
            }

            function boot() {
                router.map([
                    { route: '', title: 'File Upload', moduleId: 'viewmodels/fileUpload', nav: true },
                    { route: 'files', title: 'File List', moduleId: 'viewmodels/files', nav: true },
                ]).buildNavigationModel();

                return router.activate();
            }
        }
    };
});