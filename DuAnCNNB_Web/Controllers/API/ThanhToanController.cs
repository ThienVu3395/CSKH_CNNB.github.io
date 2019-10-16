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
    public class ThanhToanController : ApiController
    {
        DatabaseCSKHEntities1 db = new DatabaseCSKHEntities1();
        // Danh Sách Cửa Hàng
        [HttpGet]
        [Route("DsCuaHang")]
        public IHttpActionResult DanhSachCuaHang()
        {
            var dsCuaHang = db.tbDiemthutiens.Take(6).ToArray();
            return Ok(dsCuaHang);
        }
    }
}
