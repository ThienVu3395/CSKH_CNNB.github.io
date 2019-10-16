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
        public ActionResult ThongTinChung()
        {
            return View();
        }

        public ActionResult CamNang()
        {
            return View();
        }

        public ActionResult ThuTuc()
        {
            return View();
        }

        public ActionResult CauHoi()
        {
            return View();
        }

        public ActionResult ChiTietBaiViet(int idBaiViet)
        {
            ViewBag.idBaiViet = idBaiViet;
            return View();
        }
    }
}