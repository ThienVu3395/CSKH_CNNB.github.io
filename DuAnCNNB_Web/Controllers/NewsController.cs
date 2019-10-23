using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DuAnCNNB_Web.Controllers
{
    public class NewsController : Controller
    {
        public ActionResult ChiTietBaiViet(int idBaiViet)
        {
            ViewBag.idBaiViet = idBaiViet;
            return View();
        }

        public ActionResult BaiVietTheoDanhMuc(int idDanhMuc)
        {
            ViewBag.Header = "";
            if(idDanhMuc == 1)
            {
                ViewBag.Header = "Cẩm Nang Sử Dụng Nước".ToUpper();
            }

            else if (idDanhMuc == 3)
            {
                ViewBag.Header = "Thư Viện Câu Hỏi".ToUpper();
            }

            else if (idDanhMuc == 4)
            {
                ViewBag.Header = "Thông Tin Chung".ToUpper();
            }

            else if (idDanhMuc == 5)
            {
                ViewBag.Header = "Thủ Tục-Biểu Mẫu".ToUpper();
            }
            ViewBag.idDanhMuc = idDanhMuc;
            return View();
        }
    }
}