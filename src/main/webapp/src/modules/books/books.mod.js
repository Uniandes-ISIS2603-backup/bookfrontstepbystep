(function (ng) {
    var mod = ng.module("bookModule", ['ui.router']);
    mod.constant("booksContext", "api/books");
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/books/';
            $urlRouterProvider.otherwise("/booksList");

            $stateProvider.state('booksList', {
                url: '/list',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'books.list.html',
                        controller: ['$scope', 'books', function ($scope, books) {
                                $scope.records = books.data;
                            }]
                    }
                },
                resolve: {
                    books: ['$http', function ($http) {
                            return $http.get('data/books.json');
                        }]
                }
            }).state('bookDetail', {
                url: '/{bookId:int}/detail',               
                views: {                   
                    'mainView': {
                        templateUrl: basePath + 'books.detail.html'
                    }
                }
            });
        }]);
})(window.angular);
