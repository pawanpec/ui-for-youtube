(function (angular) {
    angular.module('youtubeAdapter')
        
        .directive('adapter', [
        function adapterDirective() {

            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'Home',
                link: link
            };
            function link(scope, element, attr) {
                
            }
        }
    ]);    
})(angular);	