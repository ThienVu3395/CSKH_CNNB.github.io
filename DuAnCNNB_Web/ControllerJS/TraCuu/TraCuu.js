angular.module("CommonApp")
.controller("TraCuu",
function ($scope, CommonController) {
    // Khai báo biến xài chung
    $scope.trangThaiForm = false;
    $scope.thongTinKhachHang;
    $scope.maDanhBo = "";
    // Biến cho Tra cứu tiền nước
    $scope.trangThaiBangChuaThanhToan = false;
    $scope.trangThaiDanhSachHoaDon = false;
    $scope.thongTinTienNuocChuaThanhToan = [];
    $scope.danhSachHoaDon = [];
    // Tra cứu định mức
    var API_TienNuoc = 'TraCuu/DinhMuc?maDanhBo=';
    $scope.xemThongTin = function () {
        if ($scope.maDanhBo == "") {
            $scope.trangThaiForm = false;
            return alert("Mã Danh Bộ Không Được Rỗng!!!");
        }
        var res = CommonController.getData(API_TienNuoc, $scope.maDanhBo);
        res.then(
            function success(response) {
                $scope.thongTinKhachHang = response.data;
                if ($scope.thongTinKhachHang !== null) {
                    $scope.trangThaiForm = true;
                    $scope.trangThaiBangChuaThanhToan = false;
                    $scope.trangThaiDanhSachHoaDon = false;
                }
                else {
                    alert("Mã Danh Bộ Không Tồn Tại !!!");
                    $scope.trangThaiForm = false;
                }
            },
            function errorCallback(response) {
                console.log(response.data);
                $scope.trangThaiForm = false;
            }
    )
    }

    // Tra cứu tiền nước
    //Xem chi tiết hóa đơn khách hàng chưa thanh toán
    var API_HoaDonChuaThanhToan = 'TraCuu/TienNuocChuaThanhToan?maDanhBo=';
    $scope.xemHoaDonChuaThanhToan = function () {
        var res = CommonController.getData(API_HoaDonChuaThanhToan, $scope.maDanhBo);
        res.then(
            function success(response) {
                if (response.data.length !== 0) {
                    $scope.trangThaiBangChuaThanhToan = !$scope.trangThaiBangChuaThanhToan;
                    $scope.thongTinTienNuocChuaThanhToan = response.data;
                }
                else {
                    $scope.trangThaiBangChuaThanhToan = false;
                    alert("Khách Hàng Này Đã Thanh Toán Hết Hóa Đơn !!!");
                }
            },
            function errorCallback(response) {
                console.log(response.data.message);
            }
        )
    }

    //Xem danh sách hóa đơn trong năm
    var API_DanhSachHoaDonTrongNam = 'TraCuu/DanhSachHoaDon?maDanhBo=';
    $scope.xemDanhSachHoaDon = function () {
        var res = CommonController.getData(API_DanhSachHoaDonTrongNam, $scope.maDanhBo);
        res.then(
            function success(response) {
                if (response.data.length !== 0) {
                    $scope.trangThaiDanhSachHoaDon = !$scope.trangThaiDanhSachHoaDon;
                    $scope.danhSachHoaDon = response.data;
                }
                else {
                    $scope.trangThaiDanhSachHoaDon = false;
                    alert("Khách Hàng Này Đã Thanh Toán Hết Hóa Đơn !!!");
                }
            },
            function errorCallback(response) {
                console.log(response.data.message);
            }
        )
    }
})
.controller("TraCuuTienDo",
    function ($scope, CommonController) {
        // Tra cứu tiến độ gắn mới
        $scope.trangThaiTienDo = 1;
        $scope.message = "";
        $scope.trangThaiForm = false;
        $scope.trangThaiThongBao = false;
        $scope.soHoSo = "";
        var API_TraCuuGanMoi = 'TraCuu/TienDoGanMoi?soHoSo=';
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

        $scope.timSoHS = function () {
            if ($scope.soHoSo === "") {
                $scope.message = "Số Hồ Sơ Không Được Trống !!";
                $scope.trangThaiForm = false
                $scope.trangThaiThongBao = true;
                return;
            }
            var res = CommonController.getData(API_TraCuuGanMoi, $scope.soHoSo);
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

////Tra cứu điều chỉnh hồ sơ
//.controller("TraCuuHoSo",
//    function ($scope, $http) {
//        $scope.trangThaiForm = false;
//        $scope.maDanhBo = "";
//        $scope.timMDB = function () {
//            if ($scope.maDanhBo == "") {
//                alert("Mã Danh Bộ Không Được Rỗng!!!");
//                return;
//            }
//            var res = $http({
//                url: 'http://localhost:64710/TraCuu/HoSo?maDanhBo=' + $scope.maDanhBo,
//                method: 'GET'
//            })
//            res.then(
//                function success(response) {
//                    $scope.thongTinKhachHang = response.data;
//                    if ($scope.thongTinKhachHang !== null) {
//                        $scope.trangThaiForm = true;
//                    }
//                    else {
//                        alert("Mã Danh Bộ Không Tồn Tại !!!");
//                        $scope.trangThaiForm = false;
//                    }
//                },
//                function errorCallback(response) {
//                    $scope.trangThaiForm = false;
//                }
//            )
//        }
//})