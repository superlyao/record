var myUIRoute = angular.module('MyUIRoute', ['ui.router', 'ngAnimate']);
myUIRoute.config(function($stateProvider, $urlRouterProvider) {
    //默认启动界面
    $urlRouterProvider.otherwise("/state1");
    $stateProvider
        .state('state1', {
            url: "/state1",
            templateUrl: "tpls/state1.html"
        })
        .state('state1.list', {
            url: "/list",
            templateUrl: "tpls/state1.list.html",
            controller: function($scope) {
                $scope.items = ["b", "List", "Of", "Items"];
            }
        })
        .state('state2', { //真正的url
            //浏览器显示的url
            url: "/state3",
            templateUrl: "tpls/state2.html"
        })
        .state('state2.list', {//相当于state2/list
            url: "/list",
            templateUrl: "tpls/state2.list.html",
            controller: function($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        });
});
