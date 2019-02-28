var myCSSModule = angular.module('MyCSSModule', []);
myCSSModule.controller('CSSCtrl', ['$scope',
    function($scope) {
        $scope.color = "red";
        $scope.setGreen = function() {
            if ($scope.color==="red"){
                $scope.color = "green";
            }
            else if($scope.color==="green"){
                $scope.color = "red";
            }
            // $scope.color = "green";
        }
    }
])
