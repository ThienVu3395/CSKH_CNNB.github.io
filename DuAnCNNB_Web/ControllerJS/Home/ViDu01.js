angular.module("CommonApp")
    // Báo Chỉ Số Nước + Đăng ký gắn mới + đk nâng dời + đk điều chỉnh
    .controller("DichVuTrucTuyen",
    function ($scope, CommonController) {
            // Những biến dùng chung cho 4 form
            $scope.maDanhBo = "";
            $scope.guiFormThanhCong = false;
            $scope.trangThaiHienThiForm = false;
            $scope.trangThaiThongBao = false;
            $scope.message = "";
            $scope.ThongBaoCaptcha = false;
            $scope.captcha = CommonController.captcha();
            $scope.recaptcha = "";

            // Những biến dùng riêng form gắn mới
            $scope.trangThaiFormGanMoi = true;
            $scope.danhSachPhuongTheoQuan = [];
            $scope.danhSachQuan = [];
            $scope.maQuan = "773";
            $scope.maPhuong = "77317256";
            $scope.danhSachMucDich = [{ maYeuCau: 'sh', tenYeuCau: "Sinh hoạt tư gia" }, { maYeuCau: 'sx', tenYeuCau: "Sản xuất" }, { maYeuCau: 'kd', tenYeuCau: "Kinh doanh - dịch vụ" }];
            $scope.maMucDich = $scope.danhSachMucDich[0].maYeuCau;


            // hàm Lấy danh sách Quận cho form gắn mới
            var API_layQuan = 'api/test/layQuan';
            $scope.layQuan = function () {
                var res = CommonController.getData(API_layQuan, '');
                res.then(
                    function success(response) {
                    $scope.danhSachQuan = response.data
                    },
                    function errorCallback(response) {
                    console.log(response.data.message)
                    }
                );
            }

            // hàm Lấy danh sách Phường Theo Quận mặc định form gắn mới
            var API_layPhuongMacDinh = 'api/test/layPhuongTheoQuanMacDinh?maQuan=';
            $scope.layPhuongMacDinh = function () {
                var res = CommonController.getData(API_layPhuongMacDinh, 773);
                res.then(
                    function success(response) {
                        $scope.danhSachPhuongTheoQuan = response.data
                    },
                    function errorCallback(response) {
                        console.log(response.data.message)
                    }
                );
            }

            // hàm Lấy danh sách Phường xã theo quận form gắn mới
            var API_layPhuongTheoQuan = 'api/test/layPhuongTheoQuan?maQuan=';
            $scope.layPhuong = function (maQuan) {
                $scope.maQuan = maQuan;
                var res = CommonController.getData(API_layPhuongTheoQuan, maQuan);
                res.then(
                    function success(response) {
                        $scope.danhSachPhuongTheoQuan = response.data;
                        $scope.maPhuong = $scope.danhSachPhuongTheoQuan[0].MAPHUONG;
                    },
                    function errorCallback(response) {
                        console.log(response.data.message)
                    }
                );
            }

            // hàm Chọn Phường form gắn mới
            $scope.chonPhuong = function (maPhuong) {
                $scope.maPhuong = maPhuong;
            }

            // hàm Chọn Mục Đích form gắn mới
            $scope.chonMucDich = function (maMucDich) {
                $scope.maMucDich = maMucDich;
            }
            
            // API lấy thông tin khách hàng và biến hứng kết quả từ API
            var API_GetThongTinKhachHang = 'TraCuu/TraCuuThongTin?maDanhBo=';
            $scope.thongTinKhachHang = {};

            // Show Thông Tin Khách Hàng
            $scope.timMaDB = function () {
                var res = CommonController.getData(API_GetThongTinKhachHang, $scope.maDanhBo);
                res.then(
                    function success(response) {
                        $scope.thongTinKhachHang = response.data;
                        $scope.trangThaiHienThiForm = true;
                        $scope.trangThaiThongBao = false;
                    },
                    function errorCallback(response) {
                        $scope.trangThaiHienThiForm = false;
                        $scope.trangThaiThongBao = true;
                        $scope.message = response.data.Message;
                    }
                )
            }

            // Hàm chung để xử lý thao tác đk báo chỉ số + đk nâng dời + đk điều chỉnh và biến chứa thông tin gửi đi
            $scope.thongTinGuiDi = {};
            // API đăng ký báo chỉ số nước + nâng dời + điều chỉnh
            var API_DangKyForm = '';
            $scope.DangKy = function(trangThai){
                $scope.guiFormThanhCong = false;
                if ($scope.recaptcha !== $scope.captcha) {
                    $scope.message = "Mã xác nhận không đúng , vui lòng nhập lại";
                    $scope.ThongBaoCaptcha = true;
                    $scope.captcha = CommonController.captcha();
                    return;
                }

                if (trangThai === "bcsn") {
                    $scope.thongTinGuiDi.DANHBO = $scope.thongTinKhachHang.MADB;
                    $scope.thongTinGuiDi.TENHOPDONG = $scope.thongTinKhachHang.TENKH;
                    $scope.thongTinGuiDi.DIACHI1 = $scope.thongTinKhachHang.DIACHI1;
                    $scope.thongTinGuiDi.DIACHI2 = $scope.thongTinKhachHang.DIACHI2;
                    $scope.thongTinGuiDi.QUAN = $scope.thongTinKhachHang.MAQUAN;
                    $scope.thongTinGuiDi.PHUONG = $scope.thongTinKhachHang.MAPHUONG;
                    $scope.thongTinGuiDi.NGAYBAO = CommonController.dateMonthYear() + " " + CommonController.times();

                    // API dành cho đăng ký báo chỉ số nước
                    API_DangKyForm = 'api/test/DangKyBaoChiSoNuoc';
                }

                else if (trangThai === "gm") {
                    $scope.thongTinGuiDi.SOHS = "GM-123";
                    $scope.thongTinGuiDi.LOAIYEUCAU = "YCM";
                    $scope.thongTinGuiDi.MAQUAN = $scope.maQuan;
                    $scope.thongTinGuiDi.MAPHUONG = $scope.maPhuong;
                    $scope.thongTinGuiDi.MDSD = $scope.maMucDich;
                    $scope.thongTinGuiDi.EMAILBC = "Email BC mẫu";
                    $scope.thongTinGuiDi.GHICHU = "Ghi Chú Mẫu";
                    $scope.thongTinGuiDi.TOADO = "Tọa Độ Mẫu";
                    $scope.thongTinGuiDi.NGAYYC = CommonController.dateMonthYear() + " " + CommonController.times();
                    $scope.thongTinGuiDi.TRANGTHAI = 1;
                    $scope.thongTinGuiDi.DANHBO = "Chưa Có";
                    $scope.thongTinGuiDi.ID_YEUCAUNANGDOI = 3;

                    // API dùng chung cho đăng ký gắn mới + hiệu chỉnh + nâng dời
                    API_DangKyForm = 'api/test/DangKyGMDCND';
                }
                else {
                    if (trangThai === "nd") {
                        $scope.thongTinGuiDi.SOHS = "ND-123";
                        $scope.thongTinGuiDi.LOAIYEUCAU = "YCND";
                    }
                    else if (trangThai === "dc") {
                        $scope.thongTinGuiDi.SOHS = "DC-123";
                        $scope.thongTinGuiDi.LOAIYEUCAU = "YCDC";
                    }
                    $scope.thongTinGuiDi.TENKH = $scope.thongTinKhachHang.TENKH;
                    $scope.thongTinGuiDi.DIACHI1 = $scope.thongTinKhachHang.DIACHI1;
                    $scope.thongTinGuiDi.DIACHI2 = $scope.thongTinKhachHang.DIACHI2;
                    $scope.thongTinGuiDi.MAQUAN = $scope.thongTinKhachHang.MAQUAN;
                    $scope.thongTinGuiDi.MAPHUONG = $scope.thongTinKhachHang.MAPHUONG;
                    $scope.thongTinGuiDi.EMAIL = $scope.thongTinKhachHang.EMAIL;
                    $scope.thongTinGuiDi.NGAYYC = CommonController.dateMonthYear() + " " + CommonController.times();
                    API_DangKyForm = 'api/test/DangKyGMDCND';
                }
                var res = CommonController.postData(API_DangKyForm, $scope.thongTinGuiDi);
                res.then(
                    function success(response) {
                        $scope.message = response.data;
                        $scope.guiFormThanhCong = true;
                        $scope.ThongBaoCaptcha = false;
                        $scope.trangThaiThongBao = false;
                        $scope.trangThaiHienThiForm = false;
                        $scope.trangThaiFormGanMoi = false;
                        $scope.maDanhBo = "";
                    },
                    function errorCallback(response) {
                        console.log(response.data);
                        $scope.trangThaiHienThiForm = false;
                    }
                );
            }
    })
.controller("LienHe",
    function ($scope, CommonController) {
        $scope.thongTinLienHe = {};
        $scope.trangThaiGuiForm = false;
        var API_LienHe = 'api/test/GuiFormLienHe';
        $scope.guiThongTinLienHe = function () {
            $scope.thongTinLienHe.Ngayguicauhoi = CommonController.dateMonthYear() + " " + CommonController.times();
            //$scope.thongTinLienHe.Diachi = "Quận 7";
            //$scope.thongTinLienHe.Trangthaicauhoi = 2;
            //$scope.thongTinLienHe.Noidungtraloi = "abc";
            //$scope.thongTinLienHe.Nguoitraloi = "hihi";
            //$scope.thongTinLienHe.Ngaytraloi = CommonController.dateMonthYear() + " " + CommonController.times();
            var res = CommonController.postData(API_LienHe, $scope.thongTinLienHe);
            res.then(
                function success(response) {
                    $scope.trangThaiGuiForm = true;
                },
                function errorCallback(response) {
                    alert("sai");
                }
            );
        }
})