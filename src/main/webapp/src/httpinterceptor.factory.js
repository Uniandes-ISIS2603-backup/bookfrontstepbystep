(function(ng){
    var appModule = angular.module('mainApp');
    
    appModule.factory('httpInterceptor', ['$q', function($q){
        var interceptor = {
            response: function(response) {
                return response;
            },
            responseError: function(rejection) {
                var status = rejection.status;
                function showError(message){
                    var template = `<div class="alert alert-danger">
                                        <strong>Error!</strong> ${message} </div>`;
                    var alertPanel = document.getElementById('alertPanel');
                    alertPanel.innerHTML = template;
                    alertPanel.style.opacity = 1;
                    
                    setTimeout(function(){
                        alertPanel.style.opacity = 0;
                    }, 5000);
                }
                switch(status){
                    case 403: showError('No se tienen permisos para ver esta página.'); return;
                    case 403: showError('Información restringida.'); return;
                    case 404: showError('No se encontró la información solicitada.'); return;
                    case 500: showError('Ocurrió un error consultando la información en el servidor'); return;
                    case 503: showError('El servicio se encuentra temporalmente fuera de servicio'); return;
                    default: showError('Ocurrio un error inesperado.');return;
                }
                return $q.reject(rejection);
             }
        };
        return interceptor;
    }]);

    appModule.config(['$httpProvider', function($httpProvider) {  
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
})(window.angular);