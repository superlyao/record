/**
 * Created by super on 2017/3/25.
 */
function EventController($scope) {
    $scope.count=0;
    $scope.$on('MyEvent',function () {
        $scope.count++;
    })
}