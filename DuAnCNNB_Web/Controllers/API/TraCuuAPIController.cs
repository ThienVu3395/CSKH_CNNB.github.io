using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DuAnCNNB_Web.Models;

namespace DuAnCNNB_Web.Controllers
{
    [RoutePrefix("TraCuu")]
    public class TraCuuAPIController : ApiController
    {
        DatabaseCSKHEntities1 db = new DatabaseCSKHEntities1();

        //Tra Cứu Định Mức
        [HttpGet]
        [Route("DinhMuc")]
        public IHttpActionResult TraCuuDinhMuc(string maDanhBo)
        {
            if (maDanhBo != "")
            {
                var ttkh = db.tbMadanhboes.Where(x => x.MADB == maDanhBo);
                return Ok(ttkh.FirstOrDefault());
            }
            else return BadRequest();
        }

        // Tra cứu tiền nước chưa thanh toán
        [HttpGet]
        [Route("TienNuocChuaThanhToan")]
        public IHttpActionResult TraCuuTienNuocChuaThanhToan(string maDanhBo)
        {
            if (maDanhBo != "")
            {
                var tienNuoc = db.tbTiennuocs.Where(x => x.MADB == maDanhBo && x.TRANGTHAI == null).ToArray();
                return Ok(tienNuoc);
            }
            else return BadRequest();
        }

        // Tra cứu Danh Sách Tiền Nước
        [HttpGet]
        [Route("DanhSachHoaDon")]
        public IHttpActionResult TraCuuTienNuoc(string maDanhBo)
        {
            if (maDanhBo != "")
            {
                var tienNuoc = db.tbTiennuocs.Where(x => x.MADB == maDanhBo).ToArray();
                return Ok(tienNuoc);
            }
            else return BadRequest();
        }

        // Tra Cứu tiến độ gắn mới
        [HttpGet]
        [Route("TienDoGanMoi")]
        public IHttpActionResult TraCuuGanMoi(string soHoSo)
        {
            if (soHoSo != "")
            {
                var ttkh = db.tbGanmois.Where(x => x.SOHS == soHoSo && x.LOAIYEUCAU == "YCM").SingleOrDefault();
                TraCuuGanMoi thongTin = new TraCuuGanMoi();
                thongTin.TENKH = ttkh.TENKH;
                thongTin.DIACHI = ttkh.DIACHI1 + " " + ttkh.DIACHI2;
                thongTin.NGAYYEUCAU = ttkh.NGAYYC.ToString();
                return Ok(thongTin);
            }
            else return BadRequest("sai rồi ba");
        }

        // Tra cứu Hồ Sơ Điều Chỉnh
        [HttpGet]
        [Route("HoSo")]
        public IHttpActionResult TraCuuHoSo(string maDanhBo)
        {
            if (maDanhBo != "")
            {
                var ttkh = db.tbDieuchinhs.Where(x => x.MADB == maDanhBo);
                return Ok(ttkh.FirstOrDefault());
            }
            else return BadRequest();
        }
    }
}
