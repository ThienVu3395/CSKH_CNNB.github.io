angular.module("CommonApp")
    // Báo Chỉ Số Nước + Đăng ký gắn mới + đk nâng dời + đk điều chỉnh
    .controller("DichVuTrucTuyen",
    function ($scope, CommonController) {
            // Những biến dùng chung
            $scope.maDanhBo = "";
            $scope.guiFormThanhCong = false;
            $scope.trangThaiHienThiForm = false;
            $scope.trangThaiThongBao = false;
            $scope.message = "";
            $scope.ThongBaoCaptcha = false;
            $scope.captcha = CommonController.captcha();
            $scope.recaptcha = "";
            
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
         
            // API Đăng Ký Báo Chỉ Số Nước và biến chứa thông tin gửi đi
            var API_BaoChiSo = 'api/test/postThongTinChiSoNuoc';
            $scope.thongTinGuiDi = {};
            $scope.dangKyBaoChiSoNuoc = function () {
                if ($scope.recaptcha !== $scope.captcha) {
                    $scope.message = "Mã xác nhận không đúng , vui lòng nhập lại";
                    $scope.ThongBaoCaptcha = true;
                    $scope.captcha = CommonController.captcha();
                    return;
                }
                $scope.thongTinGuiDi.DANHBO = $scope.thongTinKhachHang.MADB;
                $scope.thongTinGuiDi.TENHOPDONG = $scope.thongTinKhachHang.TENKH;
                $scope.thongTinGuiDi.DIACHI1 = $scope.thongTinKhachHang.DIACHI1;
                $scope.thongTinGuiDi.DIACHI2 = $scope.thongTinKhachHang.DIACHI2;
                $scope.thongTinGuiDi.QUAN = $scope.thongTinKhachHang.MAQUAN;
                $scope.thongTinGuiDi.PHUONG = $scope.thongTinKhachHang.MAPHUONG;
                $scope.thongTinGuiDi.NGAYBAO = CommonController.dateMonthYear() + " " + CommonController.times();
                var res = CommonController.postData(API_BaoChiSo, $scope.thongTinGuiDi);
                res.then(
                    function success(response) {
                        $scope.message = response.data;
                        $scope.guiFormThanhCong = true;
                        $scope.ThongBaoCaptcha = false;
                        $scope.trangThaiThongBao = false;
                        $scope.trangThaiHienThiForm = false;
                        $scope.maDanhBo = "";
                    },
                    function errorCallback(response) {
                        console.log(response.data);
                        $scope.trangThaiHienThiForm = false;
                    }
                );
            }

            // Đăng Ký Nâng Dời
            var API_NangDoi = 'api/test/dangKyNangDoi';
            $scope.thongTinNangDoi = {};
            $scope.dangKyNangDoi = function(){
                if ($scope.recaptcha !== $scope.captcha) {
                    alert("Mã xác nhận không đúng , vui lòng nhập lại");
                    $scope.captcha = CommonController.captcha();
                    return;
                }
                $scope.thongTinNangDoi.SOHS = "ND-123";
                $scope.thongTinNangDoi.LOAIYEUCAU = "YCND";
                $scope.thongTinNangDoi.TENKH = $scope.thongTinKhachHang.TENKH;
                $scope.thongTinNangDoi.DIACHI1 = $scope.thongTinKhachHang.DIACHI1;
                $scope.thongTinNangDoi.DIACHI2 = $scope.thongTinKhachHang.DIACHI2;
                $scope.thongTinNangDoi.MAQUAN = $scope.thongTinKhachHang.MAQUAN;
                $scope.thongTinNangDoi.MAPHUONG = $scope.thongTinKhachHang.MAPHUONG;
                $scope.thongTinNangDoi.EMAIL = $scope.thongTinKhachHang.EMAIL;
                $scope.thongTinNangDoi.NGAYYC = CommonController.dateMonthYear() + " " + CommonController.times();

                var res = CommonController.postData(API_NangDoi, $scope.thongTinNangDoi);
                res.then(
                    function success(response) {
                        alert(response.data);
                        $scope.trangThaiHienThiForm = false;
                    },
                    function errorCallback(response) {
                        console.log(response.data);
                        $scope.trangThaiHienThiForm = false;
                    }
                );
            }

            // Đăng Ký Điều Chỉnh
            var API_DieuChinh = 'api/test/dangKyDieuChinh';
            $scope.thongTinDieuChinh = {};
            $scope.dangKyDieuChinh = function(){
                if ($scope.recaptcha !== $scope.captcha) {
                    alert("Mã xác nhận không đúng , vui lòng nhập lại");
                    $scope.captcha = CommonController.captcha();
                    return;
                }
                $scope.thongTinDieuChinh.SOHS = "DC-123";
                $scope.thongTinDieuChinh.LOAIYEUCAU = "YCDC";
                $scope.thongTinDieuChinh.TENKH = $scope.thongTinKhachHang.TENKH;
                $scope.thongTinDieuChinh.DIACHI1 = $scope.thongTinKhachHang.DIACHI1;
                $scope.thongTinDieuChinh.DIACHI2 = $scope.thongTinKhachHang.DIACHI2;
                $scope.thongTinDieuChinh.MAQUAN = $scope.thongTinKhachHang.MAQUAN;
                $scope.thongTinDieuChinh.MAPHUONG = $scope.thongTinKhachHang.MAPHUONG;
                $scope.thongTinDieuChinh.EMAIL = $scope.thongTinKhachHang.EMAIL;
                $scope.thongTinDieuChinh.NGAYYC = CommonController.dateMonthYear() + " " + CommonController.times();

                var res = CommonController.postData(API_DieuChinh, $scope.thongTinDieuChinh);
                res.then(
                    function success(response) {
                        alert(response.data);
                        $scope.trangThaiHienThiForm = false;
                    },
                    function errorCallback(response) {
                        console.log(response.data);
                        $scope.trangThaiHienThiForm = false;
                    }
                );
            }
    })

    //Đăng Ký Gắn Mới
.controller("DangKyGanMoi",
    function ($scope, CommonController) {
        $scope.trangThaiFormGanMoi = true;
        $scope.danhSachPhuongTheoQuan = [];
        $scope.danhSachQuan = [];
        $scope.maQuan = "773";
        $scope.maPhuong = "77317256";
        $scope.danhSachMucDich = [{ maYeuCau: 'sh', tenYeuCau: "Sinh hoạt tư gia" }, { maYeuCau: 'sx', tenYeuCau: "Sản xuất" }, { maYeuCau: 'kd', tenYeuCau: "Kinh doanh - dịch vụ" }];
        $scope.maMucDich = $scope.danhSachMucDich[0].maYeuCau;

        // Lấy danh sách Quận
        var API_layQuan = 'api/test/layQuan';
        $scope.layQuan = function () {
            var res = CommonController.getData(API_layQuan,'');
            res.then(
                function success(response) {
                    $scope.danhSachQuan = response.data
                },
                function errorCallback(response) {
                    console.log(response.data.message)
                }
            );
        }
      
        // Lấy danh sách Phường Theo Quận mặc định
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

        // Lấy danh sách Phường xã theo quận
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

        // Chọn Phường
        $scope.chonPhuong = function (maPhuong) {
            $scope.maPhuong = maPhuong;
        }

        // Chọn Mục Đích
        $scope.chonMucDich = function (maMucDich) {
            $scope.maMucDich = maMucDich;
        }

        // Gửi thông tin gắn mới
        $scope.thongTinGanMoi = {};
        $scope.captcha = CommonController.captcha();
        $scope.recaptcha = "";
        $scope.guiDangKy = function () {
            if ($scope.recaptcha !== $scope.captcha) {
                alert("Mã xác nhận không đúng , vui lòng nhập lại");
                $scope.captcha = CommonController.captcha();
                return;
            }
            $scope.thongTinGanMoi.MAQUAN = $scope.maQuan;
            $scope.thongTinGanMoi.MAPHUONG = $scope.maPhuong;
            $scope.thongTinGanMoi.MDSD = $scope.maMucDich;

            // Gán giá trị cho những trường thông tin mặc định
            $scope.thongTinGanMoi.LOAIYEUCAU = "YCM";
            $scope.thongTinGanMoi.EMAILBC = "Email BC mẫu";
            $scope.thongTinGanMoi.GHICHU = "Ghi Chú Mẫu";
            $scope.thongTinGanMoi.TOADO = "Tọa Độ Mẫu";
            $scope.thongTinGanMoi.NGAYYC = CommonController.dateMonthYear() + " " + CommonController.times();
            $scope.thongTinGanMoi.TRANGTHAI = 1;
            $scope.thongTinGanMoi.DANHBO = "Chưa Có";
            $scope.thongTinGanMoi.ID_YEUCAUNANGDOI = 3;

            //Thực thi api gắn mới
            var API_DangKyGanMoi = 'api/test/dangKyGanMoi';
            var res = CommonController.postData(API_DangKyGanMoi, $scope.thongTinGanMoi);
            res.then(
                function success(response) {
                    alert(response.data);
                    $scope.trangThaiFormGanMoi = false;
                },
                function errorCallback(response) {
                    console.log(response.data);
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