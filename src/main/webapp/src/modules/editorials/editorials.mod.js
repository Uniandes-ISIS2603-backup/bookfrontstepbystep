(function (ng) {
    var mod = ng.module("editorialModule", ['ui.router']);
    mod.constant("editorialsContext", "api/editorials");
    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var basePath = 'src/modules/editorials/';
            $urlRouterProvider.otherwise("/editorialsList");
            self = this;
            $stateProvider.state('editorialsList', {
                url: '/list',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'editorials.list.html',
                        resolve: {
                            editorials: function ($http) {
                                return $http.get('data/editorials.json').then(function (response) {
                                    self.editorials = response.data;
                                });
                            }
                        },
                        controller: function ($scope) {
                            $scope.records = self.editorials;
                        }                       
                    }
                },
            }).state('editorialCreate', {
                url: '/create',
                views: {
                    'mainView': {
                        templateUrl: basePath + 'editorials.create.html'
                    }
                }
            });
        }]);
})(window.angular);
