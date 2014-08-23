/**
 * Created by shaikp on 8/23/2014.
 */
var App = window.App = angular.module("sentiment", ['ngRoute'
]);
App.run(function($rootScope){
    $rootScope.message="Hello world"

})