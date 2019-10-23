using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DuAnCNNB_Web.Models;

namespace DuAnCNNB_Web.Controllers.API
{
    [RoutePrefix("ThanhToan")]
    public class ThanhToanAPIController : ApiController
    {
        DatabaseCSKHEntities1 db = new DatabaseCSKHEntities1();
        // Danh Sách Cửa Hàng
        [HttpGet]
        [Route("DanhSachCuaHang")]
        public IHttpActionResult DanhSachCuaHang()
        {
            var dsCuaHang = db.tbDiemthutiens.Take(100);
            return Ok(dsCuaHang.ToArray());
        }

        [HttpGet]
        [Route("DanhSachCuaHang_PhanTrang")]
        public IHttpActionResult DanhSachCuaHang_PhanTrang(int soTrang, int soCuaHang)
        {
            var pageIndex = (soTrang - 1) * soCuaHang;
            var model = db.tbDiemthutiens.Skip(pageIndex).Take(soCuaHang);
            return Ok(model.ToArray());
        }
    }
}
