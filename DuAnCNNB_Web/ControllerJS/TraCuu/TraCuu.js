angular.module("CommonApp")
// Tra cứu định mức + tiền nước
.controller("TraCuuThongTin",
function ($scope, CommonController) {
    // Khai báo biến xài chung
    $scope.trangThaiForm = false;
    $scope.trangThaiThongBao = false;
    $scope.message = "";
    $scope.thongTinKhachHang;
    $scope.maDanhBo = "";
    // Biến cho Tra cứu tiền nước
    $scope.trangThaiBangChuaThanhToan = false;
    $scope.trangThaiDanhSachHoaDon = false;
    $scope.thongTinTienNuocChuaThanhToan = [];
    $scope.danhSachHoaDon = [];

    // API dành cho tra cứu định mức + tiền nước
    var API_TraCuuThongTin = 'TraCuu/TraCuuThongTin?maDanhBo=';
    $scope.xemThongTin = function () {
        $scope.trangThaiThongBao = false;
        var res = CommonController.getData(API_TraCuuThongTin, $scope.maDanhBo);
        res.then(
            function success(response) {
                $scope.thongTinKhachHang = response.data;
                $scope.trangThaiForm = true;
                $scope.trangThaiBangChuaThanhToan = false;
                $scope.trangThaiDanhSachHoaDon = false;
                $scope.trangThaiThongBao = false;
            },
            function errorCallback(response) {
                $scope.message = response.data.Message;
                $scope.trangThaiThongBao = true;
                $scope.trangThaiForm = false;
            }
    )}

    // Tra cứu tiền nước
    //Xem chi tiết hóa đơn khách hàng chưa thanh toán
    var API_HoaDonChuaThanhToan = 'TraCuu/TienNuocChuaThanhToan?maDanhBo=';
    $scope.xemHoaDonChuaThanhToan = function () {
        var res = CommonController.getData(API_HoaDonChuaThanhToan, $scope.maDanhBo);
        res.then(
            function success(response) {
               $scope.trangThaiBangChuaThanhToan = !$scope.trangThaiBangChuaThanhToan;
               $scope.thongTinTienNuocChuaThanhToan = response.data;
            },
            function errorCallback(response) {
                $scope.trangThaiBangChuaThanhToan = false;
                alert(response.data.Message);
            }
        )
    }

    //Xem danh sách hóa đơn trong năm
    var API_DanhSachHoaDonTrongNam = 'TraCuu/DanhSachHoaDon?maDanhBo=';
    $scope.xemDanhSachHoaDon = function () {
        var res = CommonController.getData(API_DanhSachHoaDonTrongNam, $scope.maDanhBo);
        res.then(
            function success(response) {
                $scope.trangThaiDanhSachHoaDon = !$scope.trangThaiDanhSachHoaDon;
                $scope.danhSachHoaDon = response.data;
            },
            function errorCallback(response) {
                $scope.trangThaiDanhSachHoaDon = false;
                alert(response.data.Message);
            }
        )
    }
})

// Tra cứu tiến độ gắn mới + nâng dời + điều chỉnh
.controller("TraCuuTienDo",
    function ($scope, CommonController) {
        // Các biến dùng chung
        $scope.trangThaiTienDo = 1;
        $scope.message = "";
        $scope.trangThaiForm = false;
        $scope.trangThaiThongBao = false;
        $scope.trangThai = "";
        $scope.soHoSo = "";

        $scope.gd1 = function () {
            $scope.trangThaiTienDo = 1
        }

        $scope.gd2 = function () {
            $scope.trangThaiTienDo = 2
        }

        $scope.gd3 = function () {
            $scope.trangThaiTienDo = 3
        }

        $scope.gd4 = function () {
            $scope.trangThaiTienDo = 4
        }

        $scope.timSoHS = function (trangThai) {
            if ($scope.soHoSo === "") {
                $scope.message = "Số Hồ Sơ Không Được Trống";
                $scope.trangThaiForm = false
                $scope.trangThaiThongBao = true;
                return;
            }

            else if (trangThai == "gm") {
                $scope.trangThai = "YCM"
            }

            else if (trangThai == "nd") {
                $scope.trangThai = "YCND"
            }

            else if (trangThai == "dc") {
                $scope.trangThai = "YCDC"
            }

            // API cho tra cứu gắn mới + điều chỉnh + nâng dời
            var API_TraCuuTienDo = 'TraCuu/TraCuuTienDo?soHoSo=' + $scope.soHoSo + "&trangThai=" + $scope.trangThai;

            var res = CommonController.getData(API_TraCuuTienDo, '');
            res.then(
                function success(response) {
                    $scope.thongTinKhachHang = response.data;
                    $scope.trangThaiThongBao = false;
                    $scope.trangThaiForm = true;
                },
                function errorCallback(response) {
                    $scope.message = response.data.Message;
                    $scope.trangThaiThongBao = true;
                    $scope.trangThaiForm = false;
                }
            )
        }
})