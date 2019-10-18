angular.module("CommonApp")
    .controller("DanhSachCuaHang",
    function ($scope, CommonController) {
        // API lấy toàn bộ ds cửa hàng thu hộ
        var API_DanhSachNganHang = 'ThanhToan/DanhSachCuaHang';
        $scope.tongSoTrang;
        $scope.t = [];
        $scope.soCuaHangMoiTrang = 12;
        $scope.dsCuaHang = [];
        var res = CommonController.getData(API_DanhSachNganHang, '');

        res.then(
            function success(response) {
                $scope.dsCuaHang = response.data
                $scope.tongSoTrang = Math.round($scope.dsCuaHang.length / $scope.soCuaHangMoiTrang);
                $scope.dsCuaHang.splice($scope.soCuaHangMoiTrang);
            },
            function errorCallback(response) {
                console.log(response.data);
            }
        )

        // Hiển thị danh sách trang
        $scope.hienThiDanhSachTrang = function () {
            for (let i = 0; i < $scope.tongSoTrang; i++) {
                $scope.t.push(i);
            }
            return $scope.t;
        }

        // Tương tác với nút phân trang
        $scope.phanTrang = function (soTrang) {
            var API_DanhSachCuaHang_PhanTrang = 'ThanhToan/DanhSachCuaHang_PhanTrang?soTrang=' + soTrang + '&soCuaHang=' + $scope.soCuaHangMoiTrang;
            var res = CommonController.getData(API_DanhSachCuaHang_PhanTrang, '');
            res.then(
                function success(response) {
                    $scope.tongSoTrang = response.data.tongcong;
                    $scope.dsCuaHang = response.data.pdata;
                },
                function errorCallback(response) {
                    console.log(response.data);
                }
            )
        }
})