(function (ng) {
    var mod = ng.module("bookModule", ['ui.router']);
    mod.constant("booksContext", "api/books");
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/books/';
            $urlRouterProvider.otherwise("/booksList");
            self = this;
            $stateProvider.state('booksList', {
                url: '/list',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'books.list.html',
                        controller: function ($scope, books) {
                            $scope.records = self.books;
                        },
                        resolve: {
                            books: function ($http) {
                                return $http.get('data/books.json').then(function (response) {
                                    self.books = response.data;
                                });
                            }
                        }
                    }
                },
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
