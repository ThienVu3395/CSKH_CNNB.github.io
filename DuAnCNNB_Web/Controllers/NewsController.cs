using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DuAnCNNB_Web.Controllers
{
    public class NewsController : Controller
    {
        // GET: News
        public ActionResult ThongTinChung(int idDanhMuc)
        {
            ViewBag.idDanhMuc = idDanhMuc;
            return View();
        }

        public ActionResult CamNang(int idDanhMuc)
        {
            ViewBag.idDanhMuc = idDanhMuc;
            return View();
        }

        public ActionResult ThuTuc(int idDanhMuc)
        {
            ViewBag.idDanhMuc = idDanhMuc;
            return View();
        }

        public ActionResult CauHoi(int idDanhMuc)
        {
            ViewBag.idDanhMuc = idDanhMuc;
            return View();
        }

        public ActionResult ChiTietBaiViet(int idBaiViet)
        {
            ViewBag.idBaiViet = idBaiViet;
            return View();
        }
    }
}