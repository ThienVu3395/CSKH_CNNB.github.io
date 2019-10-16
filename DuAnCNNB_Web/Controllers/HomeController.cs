using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DuAnCNNB_Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult BaoChiSo()
        {
            ViewBag.Title = "BCSN";

            return View();
        }

        public ActionResult DangKyGanMoi()
        {
            return View();
        }

        public ActionResult DangKyNangDoi()
        {
            ViewBag.Title = "DKND";

            return View();
        }

        public ActionResult DangKyHieuChinhHoSo()
        {
            ViewBag.Title = "DKHCHS";

            return View();
        }

        public ActionResult LienHe()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

    }
}
