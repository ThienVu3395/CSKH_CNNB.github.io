angular.module("CommonApp")
    // Lấy danh sách tin tức thông tin chung
    .controller("TinTuc",
        function ($scope, CommonController) {
            var API_ThongTinChung = 'TraCuu/ThongTinChung';
            $scope.dsThongTinChung = [];
            $scope.tongSoTrang;
            $scope.t = [];
            $scope.soBaiVietMoiTrang = 2;
            var res = CommonController.getData(API_ThongTinChung, '');
            res.then(
                function success(response) {
                    $scope.dsThongTinChung = response.data
                    $scope.tongSoTrang = Math.round($scope.dsThongTinChung.length / $scope.soBaiVietMoiTrang);
                    $scope.dsThongTinChung.splice($scope.soBaiVietMoiTrang);
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
                var API_ThongTinChung_PhanTrang = 'TraCuu/ThongTinChung_PhanTrang?soTrang=' + soTrang + '&soBV=' + $scope.soBaiVietMoiTrang;
                var res = CommonController.getData(API_ThongTinChung_PhanTrang, '');
                res.then(
                    function success(response) {
                        $scope.dsThongTinChung = response.data
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

            // Lấy danh sách danh mục
            //$scope.idChuyenMuc = 0;
            //$scope.danhSachDanhMuc = [];
            ////var API_DanhSachDanhMuc = 'TraCuu/DanhSachDanhMuc?idChuyenMuc=';
            //var API_DanhSachDanhMuc = 'TraCuu/DanhSachDanhMuc';
            //var res = CommonController.getData(API_DanhSachDanhMuc,'');
            //res.then(
            //    function success(response) {
            //        $scope.danhSachDanhMuc = response.data;
            //    },
            //    function errorCallback(response) {
            //        console.log(response.data);
            //    }
            //)
        })
    .controller("CamNang",
        function ($scope, CommonController) {
            var API_ThongTinChung = 'TraCuu/CamNang';
            $scope.dsThongTinChung = [];
            $scope.tongSoTrang;
            $scope.t = [];
            $scope.soBaiVietMoiTrang = 2;
            var res = CommonController.getData(API_ThongTinChung, '');
            res.then(
                function success(response) {
                    $scope.dsThongTinChung = response.data
                    $scope.tongSoTrang = Math.round($scope.dsThongTinChung.length / $scope.soBaiVietMoiTrang);
                    $scope.dsThongTinChung.splice($scope.soBaiVietMoiTrang);
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
                var API_ThongTinChung_PhanTrang = 'TraCuu/CamNang_PhanTrang?soTrang=' + soTrang + '&soBV=' + $scope.soBaiVietMoiTrang;
                var res = CommonController.getData(API_ThongTinChung_PhanTrang, '');
                res.then(
                    function success(response) {
                        $scope.dsThongTinChung = response.data
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

            // Lấy danh sách danh mục
            //$scope.idChuyenMuc = 0;
            //$scope.danhSachDanhMuc = [];
            ////var API_DanhSachDanhMuc = 'TraCuu/DanhSachDanhMuc?idChuyenMuc=';
            //var API_DanhSachDanhMuc = 'TraCuu/DanhSachDanhMuc';
            //var res = CommonController.getData(API_DanhSachDanhMuc,'');
            //res.then(
            //    function success(response) {
            //        $scope.danhSachDanhMuc = response.data;
            //    },
            //    function errorCallback(response) {
            //        console.log(response.data);
            //    }
            //)
    })