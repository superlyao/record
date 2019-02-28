/**
 * Created by liaoyao on 2017/2/28.
 */
function PhoneListCtrl($scope,$rootScope) {
    $scope.phones = [
        {"name": "aaaa",
            "snippet": "Fast just got faster with Nexus S."},
        {"name": "aaa",
            "snippet": "The Next, Next Generation tablet."},
        {"name": "aa",
            "snippet": "The Next, Next Generation tablet."}
    ];
    $rootScope.admin="superyao";
}