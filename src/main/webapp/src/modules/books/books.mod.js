(function (ng) {
    var mod = ng.module("bookModule", [ 'ui.router']);

    mod.constant("booksContext", "api/books");

    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/books/';
            $urlRouterProvider.otherwise("/booksList");

            $stateProvider.state('booksList', {
                url: '/list',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'books.list.html'
                    }
                }
            }).state('bookCreate', {
                url: '/create',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'books.create.html'
                    }
                }
            });
        }]);
})(window.angular);
