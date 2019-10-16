angular.module("ThanhToan", [])
    .controller("DanhSachCuaHang",
    function ($scope, $http) {
        $scope.dsCuaHang = [];

        $scope.layDanhSachCuaHang = function() {
            var res = $http({
                url: 'http://localhost:64710/ThanhToan/DsCuaHang',
                method: 'GET'
            })
            res.then(
                function success(response) {
                    $scope.dsCuaHang = response.data;
                },
                function errorCallback(response) {
                    console.log(response.data);
                }
            )
        }
})