angular.module("CommonApp")
    // Lấy danh sách tin tức thông tin chung
    .controller("TinTuc",
    function ($scope, CommonController) {
            var API_LayBaiVietTheoDanhMuc = 'TraCuu/BaiVietTheoDanhMuc?idChuyenMuc=';
            $scope.dsBaiVietTheoDanhMuc = [];
            $scope.tongSoTrang;
            $scope.t = [];
            $scope.soBaiVietMoiTrang = 2;
            $scope.LayBaiVietTheoDanhMuc = function (idDanhMuc) {
                var res = CommonController.getData(API_LayBaiVietTheoDanhMuc, idDanhMuc);
                res.then(
                    function success(response) {
                        $scope.dsBaiVietTheoDanhMuc = response.data;
                        $scope.tongSoTrang = Math.round($scope.dsBaiVietTheoDanhMuc.length / $scope.soBaiVietMoiTrang);
                        $scope.dsBaiVietTheoDanhMuc.splice($scope.soBaiVietMoiTrang);
                    },
                    function errorCallback(response) {
                        console.log(response.data);
                    }
                )
            }

            // Hiển thị danh sách trang
            $scope.hienThiDanhSachTrang = function () {
                for (let i = 0; i < $scope.tongSoTrang; i++) {
                    $scope.t.push(i);
                }
                return $scope.t;
            }

            // Tương tác với nút phân trang
            $scope.phanTrang = function (soTrang,idDanhMuc) {
                var API_ThongTinChung_PhanTrang = 'TraCuu/DanhSachBaiViet_PhanTrang?idDanhMuc=' + idDanhMuc + '&soTrang=' + soTrang + '&soBV=' + $scope.soBaiVietMoiTrang;
                var res = CommonController.getData(API_ThongTinChung_PhanTrang, '');
                res.then(
                    function success(response) {
                        $scope.dsBaiVietTheoDanhMuc = response.data
                    },
                    function errorCallback(response) {
                        console.log(response.data);
                    }
                )
            }

            // Lấy bài viết chi tiết theo idBaiViet
            var API_ChiTietTin = 'TraCuu/ChiTietBaiViet?idBV=';
            $scope.objTin = {};
            $scope.layID = function (id) {
                var res = CommonController.getData(API_ChiTietTin, id);
                res.then(
                    function success(response) {
                        $scope.objTin = response.data;
                    },
                    function errorCallback(response) {
                        console.log(response.data);
                    }
                )
            }

            // Quay lại trang trước ở trang chi tiết bài viết
            $scope.back = function(){
                history.back();
            }

            //Lấy danh sách danh mục
            $scope.danhSachDanhMuc = [];
            var API_DanhSachDanhMuc = 'TraCuu/DanhSachDanhMuc';
            var res = CommonController.getData(API_DanhSachDanhMuc,'');
            res.then(
                function success(response) {
                    $scope.danhSachDanhMuc = response.data;
                },
                function errorCallback(response) {
                    console.log(response.data);
                }
            )
        })