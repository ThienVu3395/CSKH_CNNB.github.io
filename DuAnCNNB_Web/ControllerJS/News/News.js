angular.module("CommonApp")
    // Lấy danh sách tin tức thông tin chung
    .controller("TinTuc",
    function ($scope, CommonController, $log, blockUI, Upload) {
        var API_LayBaiVietTheoDanhMuc = 'TraCuu/BaiVietTheoDanhMuc?idChuyenMuc=';
        $scope.dsBaiVietTheoDanhMuc = [];
        $scope.tongSoTrang;
        $scope.soBaiVietMoiTrang = 2;
        $scope.LayBaiVietTheoDanhMuc = function (idDanhMuc) {
            var res = CommonController.getData(API_LayBaiVietTheoDanhMuc, idDanhMuc);
            res.then(
                function success(response) {
                    $scope.dsBaiVietTheoDanhMuc = response.data;
                    $scope.tongSoTrang = $scope.dsBaiVietTheoDanhMuc.length;
                    $scope.dsBaiVietTheoDanhMuc.splice($scope.soBaiVietMoiTrang);
                },
                function errorCallback(response) {
                    console.log(response.data);
                }
            )
        }

        // Phân trang
        $scope.PhanTrang = function (idDanhMuc) {
            blockUI.start();
            var API_ThongTinChung_PhanTrang = 'TraCuu/DanhSachBaiViet_PhanTrang?idDanhMuc=' + idDanhMuc + '&soTrang=' + $scope.bigCurrentPage + '&soBV=' + $scope.soBaiVietMoiTrang;
            var res = CommonController.getData(API_ThongTinChung_PhanTrang, '');
            res.then(
                function success(response) {
                    $scope.dsBaiVietTheoDanhMuc = response.data;
                    blockUI.stop();
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
        $scope.back = function () {
            history.back();
        }

        //Lấy danh sách danh mục
        $scope.danhSachDanhMuc = [];
        var API_DanhSachDanhMuc = 'TraCuu/DanhSachDanhMuc';
        var res = CommonController.getData(API_DanhSachDanhMuc, '');
        res.then(
            function success(response) {
                $scope.danhSachDanhMuc = response.data;
            },
            function errorCallback(response) {
                console.log(response.data);
            }
        )

        // Upload Hình Ảnh
        //var baseURL = window.location.protocol + "//" + window.location.host + "/";
        //var appURL = { pathAPI: baseURL };
        //var uploader = $scope.uploader = new FileUploader({
        //    url: appconfig.pathapi + 'Test/UploadFiles',
        //    withCredentials: true
        //});
        //uploader.filters.push({
        //    name: 'docFilterexcel',
        //    fn: function (item /*{File|FileLikeObject}*/, options) {
        //        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        //        if ('|pdf|tif|tiff|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1)
        //            return true;
        //        else {
        //            alert("Không hỗ trợ định dạng file này!!");
        //            return false;
        //        }

        //    }
        //});
        //uploader.filters.push({
        //    name: 'asyncFilter',
        //    fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
        //        setTimeout(deferred.resolve, 1e3);
        //    }
        //});

        //uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        //};
        //uploader.onAfterAddingFile = function (fileItem) {
        //    // fileItem.upload();
        //};
        //uploader.onAfterAddingAll = function (addedFileItems) {
        //};
        //uploader.onBeforeUploadItem = function (item) {
        //};
        //uploader.onProgressItem = function (fileItem, progress) {
        //};
        //uploader.onProgressAll = function (progress) {
        //};
        //uploader.onSuccessItem = function (fileItem, response, status, headers) {
        //};
        //uploader.onErrorItem = function (fileItem, response, status, headers) {
        //};
        //uploader.onCancelItem = function (fileItem, response, status, headers) {
        //};
        //uploader.onCompleteItem = function (fileItem, response, status, headers) {

        //};

        //uploader.onCompleteAll = function () {
        //    alert("Upload file thành công!");
        //};
    }
 )