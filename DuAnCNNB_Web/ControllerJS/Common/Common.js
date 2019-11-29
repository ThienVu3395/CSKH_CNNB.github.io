(function () {
    angular.module("CommonApp", ['ngSanitize', 'blockUI', 'ui.bootstrap', 'ngFileUpload'])
         //Cấu hình cho blockUI
        .config(function(blockUIConfig){
            'blockUI',
            blockUIConfig.delay = 200;
            blockUIConfig.autoBlock = true;
            blockUIConfig.blockBrowserNavigation = false;
        })
        .factory("CommonController", ["$http",
            function ($http) {
                // Tạo UrlAPI động
                var baseURL = window.location.protocol + "//" + window.location.host + "/";
                var appURL = { pathAPI: baseURL };

                // Hàm Tạo Ra Mã Xác Nhận Ngẫu Nhiên 
                this.getCaptcha = () => {
                    var result = "";
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for (var i = 0; i < 6; i++) {
                        var j = parseInt(Math.random() * 10000);
                        result += characters.charAt(j % charactersLength);
                    }
                    return result;
                };

                // Hàm Get API
                this.getData = (urlAPI, MaDanhBo) => {
                    var res = $http({
                        url: appURL.pathAPI + urlAPI + MaDanhBo,
                        method: 'GET'
                    });
                    return res;
                };

                // Hàm Post API
                this.postData = (urlAPI, Data) => {
                    var res = $http({
                        url: appURL.pathAPI + urlAPI,
                        method: 'POST',
                        data: Data,
                        headers: { 'Content-Type': 'application/json' }
                    })
                    return res
                };

                // Hàm Lấy Ngày Tháng Năm
                this.getDateMonthYear = () => {
                    var currentdate = new Date();
                    var dateMonthYear = "2019" + "-" + (currentdate.getMonth() + 1) + "-" + (currentdate.getDate());
                    return dateMonthYear;
                };

                // Hàm Lấy Giờ Phút Giây
                this.getTimes = () => {
                    var currentdate = new Date();
                    var times = currentdate.getHours() + ":" + currentdate.getMinutes();
                    return times;
                };

                return {
                    getData: this.getData,
                    postData: this.postData,
                    captcha: this.getCaptcha,
                    dateMonthYear: this.getDateMonthYear,
                    times: this.getTimes,
                }
            }]);
})();