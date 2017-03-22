 (function (ng) {
     var mod = ng.module("authorModule", ['ui.router']);
     mod.constant("authorContext", "api/authors");
     mod.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){
             var basePath = 'src/modules/authors/';
             $urlRouterProvider.otherwise("/authorList");
             self = this;
             $stateProvider.state('authorsList', {
                url: '/list',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'authors.list.html',
                        controller: function ($scope, authors) {
                            $scope.records = self.authors;
                        },
                        resolve: {
                            authors: function ($http) {
                                return $http.get('data/authors.json').then(function (response) {
                                    self.authors = response.data;
                                });
                            }
                        }
                    }
                }
            });
}]);

})(window.angular);