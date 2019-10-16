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

        //------------------------- Hàm Lấy Thông Tin Khách Hàng Theo Mã Danh Bộ
        [HttpGet]
        [Route("getThongTinKhachHang")]
        public IHttpActionResult getInfoCustomer(string maDanhBo)
        {
            if(maDanhBo != "")
            {
                var thongTinKhachHang = db.tbMadanhboes.Where(x => x.MADB == maDanhBo);
                return Ok(thongTinKhachHang.FirstOrDefault());
            }
            else
            {
                return BadRequest();
            }
        }

        // Hàm gửi thông tin báo chỉ số nước
        [HttpPost]
        [Route("postThongTinChiSoNuoc")]
        public IHttpActionResult postInfo(Baochisonuoc thongTin)
        {
            db.Baochisonuocs.Add(thongTin);
            db.SaveChanges();
            return Ok("Báo chỉ số thành công !!!");
        }

        // Hàm gửi thông tin đăng ký nâng dời đổi cỡ đhn
        [HttpPost]
        [Route("dangKyNangDoi")]
        public IHttpActionResult dangKyNangDoi(tbGanmoi objNangDoi)
        {
            db.tbGanmois.Add(objNangDoi);
            db.SaveChanges();
            return Ok("Đăng Ký Thành Công !!!");
        }

        // Hàm gửi thông tin đăng ký điều chỉnh hs
        [HttpPost]
        [Route("dangKyDieuChinh")]
        public IHttpActionResult dangKyDieuChinh(tbGanmoi objDieuChinh)
        {
            db.tbGanmois.Add(objDieuChinh);
            db.SaveChanges();
            return Ok("Đăng Ký Thành Công !!!");
        }

        //--------------------------- Đăng Ký Gắn Mới

        // Lấy Quận Mặc định
        [HttpGet]
        [Route("layQuan")]
        public IHttpActionResult layQuan()
        {
            var Quan = db.tbQuans.ToArray();
            return Ok(Quan);
        }

        // Lấy Phường Theo Quận Mặc Định
        [HttpGet]
        [Route("layPhuongTheoQuanMacDinh")]
        public IHttpActionResult layPhuongTheoQuanMacDinh()
        {
            var Quan = db.tbPhuongs.Where(x => x.MAQUAN == "773").ToArray();
            return Ok(Quan);
        }

        // Lấy Phường Theo Quận Đã Chọn
        [HttpGet]
        [Route("layPhuongTheoQuan")]
        public IHttpActionResult layPhuongTheoQuan(string maQuan)
        {
            var Quan = db.tbPhuongs.Where(x => x.MAQUAN == maQuan).ToArray();
            return Ok(Quan);
        }

        // Gửi Form Gắn Mới
        [HttpPost]
        [Route("dangKyGanMoi")]
        public IHttpActionResult dangKyGanMoi(tbGanmoi objGanMoi)
        {
            db.tbGanmois.Add(objGanMoi);
            db.SaveChanges();
            return Ok("Đăng Ký Gắn Mới Thành Công");
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
