
App.config(['$routeProvider', function ($routeProvider) {
    angular.forEach(getRoutes(), function (routeObj) {
        $routeProvider.when(routeObj.route, routeObj.config);
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
/* this function is responsible for routing configuration */
function getRoutes() {
    var routes = [
        {
            route: '/login',
            config: {
                controller: 'LoginController',
                templateUrl: 'views/login.html',
                title: 'Login'
            }


        },
        {
            route: '/results',
            config: {
                controller: 'ResultsController',
                templateUrl: 'views/results.html',
                title: 'results'
            }

        }
    ];
    return routes;
}
/**
 * Created by shaikp on 8/23/2014.
 */
