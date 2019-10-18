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

        //Tra Cứu Định Mức + Tiền Nước
        [HttpGet]
        [Route("TraCuuThongTin")]
        public IHttpActionResult TraCuuThongTin(string maDanhBo)
        {
            if (maDanhBo != null)
            {
                var ttkh = db.tbMadanhboes.Where(x => x.MADB == maDanhBo).FirstOrDefault();
                if(ttkh != null)
                {
                    return Ok(ttkh);
                }
                else return BadRequest("Mã Danh Bộ Không Tồn Tại");
            }
            else return BadRequest("Mã Danh Bộ Không Được Trống");
        }

        // Tra cứu tiền nước chưa thanh toán
        [HttpGet]
        [Route("TienNuocChuaThanhToan")]
        public IHttpActionResult TraCuuTienNuocChuaThanhToan(string maDanhBo)
        {
            if (maDanhBo != "")
            {
                var tienNuoc = db.tbTiennuocs.Where(x => x.MADB == maDanhBo && x.TRANGTHAI == null).ToArray();
                if(tienNuoc.Length != 0)
                {
                    return Ok(tienNuoc);
                }
                return BadRequest("Khách Hàng Này Đã Thanh Toán Hết Hóa Đơn");
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
                if (tienNuoc.Length != 0)
                {
                    return Ok(tienNuoc);
                }
                return BadRequest("Khách Hàng Này Đã Thanh Toán Hết Hóa Đơn");
            }
            else return BadRequest();
        }

        // Tra Cứu tiến độ gắn mới + nâng dời + điều chỉnh
        [HttpGet]
        [Route("TraCuuTienDo")]
        public IHttpActionResult TraCuuGanMoi(string soHoSo,string trangThai)
        {
            if (soHoSo != "")
            {
                var ttkh = db.tbGanmois.Where(x => x.SOHS == soHoSo && x.LOAIYEUCAU == trangThai).FirstOrDefault();
                var message = "";
                if(trangThai == "YCM")
                {
                    message = "Gắn Mới";
                }
                else if(trangThai == "YCND")
                {
                    message = "Nâng Dời";
                }

                else if (trangThai == "YCDC")
                {
                    message = "Điều Chỉnh";
                }

                if (ttkh != null)
                {
                    TraCuuGanMoi thongTin = new TraCuuGanMoi();
                    thongTin.SOHS = ttkh.SOHS;
                    thongTin.TENKH = ttkh.TENKH;
                    thongTin.DIACHI = ttkh.DIACHI1 + " " + ttkh.DIACHI2;
                    thongTin.SODT = thongTin.SODT != null ? thongTin.SODT : "Chưa cập nhật";
                    thongTin.NGAYYEUCAU = ttkh.NGAYYC.ToString();
                    return Ok(thongTin);
                }
                return BadRequest("Số Hồ Sơ Không Tồn Tại Hoặc Không Phải Là Hồ Sơ " + message);
            }
            else return BadRequest("sai rồi ba");
        }
    }
}
