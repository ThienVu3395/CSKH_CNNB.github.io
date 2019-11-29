angular.module("CommonApp")
    .controller("DanhSachCuaHang",
    function ($scope, CommonController, $log) {
        //API lấy toàn bộ ds cửa hàng thu hộ
        var API_DanhSachNganHang = 'ThanhToan/DanhSachCuaHang';
        $scope.tongSoTrang = 0;
        $scope.soCuaHangMoiTrang = 12;
        $scope.maxSize = 5; // số trang trong 1 lần hiển thị
        $scope.dsCuaHang = [];
        var res = CommonController.getData(API_DanhSachNganHang, '');
        res.then(
            function success(response) {
                $scope.dsCuaHang = response.data;
                $scope.tongSoTrang = $scope.dsCuaHang.length;
                $scope.dsCuaHang.splice($scope.soCuaHangMoiTrang);
            },
            function errorCallback(response) {
                console.log(response.data);
            }
        )

        $scope.PhanTrang = function () {
            var API_DanhSachCuaHang_PhanTrang = 'ThanhToan/DanhSachCuaHang_PhanTrang?soTrang=' + $scope.bigCurrentPage + '&soCuaHang=' + $scope.soCuaHangMoiTrang;
            var res = CommonController.getData(API_DanhSachCuaHang_PhanTrang, '');
            res.then(
                function success(response) {
                    $scope.dsCuaHang = response.data;
                },
                function errorCallback(response) {
                    alert("Có lỗi")
                    console.log(response.data)
                }
            )
        }
    })