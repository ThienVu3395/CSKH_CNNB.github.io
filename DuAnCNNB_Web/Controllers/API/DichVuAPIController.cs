using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DuAnCNNB_Web.Models;

namespace DuAnCNNB_Web.Controllers
{
    [RoutePrefix("api/test")]
    public class TestAPIController : ApiController
    {
        DatabaseCSKHEntities1 db = new DatabaseCSKHEntities1();

        // Hàm đăng ký báo csn + đk nâng dời + đk hiệu chỉnh + đk gắn mới
        [HttpPost]
        [Route("DangKyGMDCND")]
        public IHttpActionResult DangKyGMDCND(tbGanmoi objDangKy)
        {
            db.tbGanmois.Add(objDangKy);
            db.SaveChanges();
            return Ok("Đăng Ký Thành Công");
        }

        // Hàm gửi thông tin báo chỉ số nước
        [HttpPost]
        [Route("DangKyBaoChiSoNuoc")]
        public IHttpActionResult BaoChiSoNuoc(Baochisonuoc thongTin)
        {
            db.Baochisonuocs.Add(thongTin);
            db.SaveChanges();
            return Ok("Đăng Ký Thành Công");
        }

        // Các hàm cho Đăng Ký Gắn Mới
        // -------- Lấy danh sách quận
        [HttpGet]
        [Route("layQuan")]
        public IHttpActionResult layQuan()
        {
            var Quan = db.tbQuans.ToArray();
            return Ok(Quan);
        }

        // Lấy ds phường Theo Quận Mặc Định
        [HttpGet]
        [Route("layPhuongTheoQuanMacDinh")]
        public IHttpActionResult layPhuongTheoQuanMacDinh()
        {
            var Quan = db.tbPhuongs.Where(x => x.MAQUAN == "773").ToArray();
            return Ok(Quan);
        }

        // Lấy ds Phường Theo Quận Đã Chọn
        [HttpGet]
        [Route("layPhuongTheoQuan")]
        public IHttpActionResult layPhuongTheoQuan(string maQuan)
        {
            var Quan = db.tbPhuongs.Where(x => x.MAQUAN == maQuan).ToArray();
            return Ok(Quan);
        }

        // Gửi Form Liên Hệ
        [HttpPost]
        [Route("GuiFormLienHe")]
        public IHttpActionResult guiFormLienHe(tbHoidap objLienHe)
        {
            db.tbHoidaps.Add(objLienHe);
            db.SaveChanges();
            return Ok("Gửi Form Liên Hệ Thành Công !!!");
        }
    }
}
