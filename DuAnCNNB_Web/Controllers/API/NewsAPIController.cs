using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DuAnCNNB_Web.Models;
namespace DuAnCNNB_Web.Controllers.API
{
    [RoutePrefix("TraCuu")]
    public class NewsAPIController : ApiController
    {
        DatabaseCSKHEntities1 db = new DatabaseCSKHEntities1();
        [HttpGet]
        [Route("DanhSachDanhMuc")]
        public IHttpActionResult DanhSachDanhMuc()
        {
                var model = (from a in db.tbChuyenMucBaiViets
                             where a.TrangThai == 1
                             select new
                             {
                                 id = a.ID_ChuyenMuc,
                                 tenchuyenmuc = a.TenChuyenMuc,

                             }).AsEnumerable().Select(x => new DanhSachDanhMuc()
                             {
                                 ID_ChuyenMuc = x.id,
                                 TenChuyenMuc = x.tenchuyenmuc
                             });
                return Ok(model.ToList());
        }

        [HttpGet]
        [Route("BaiVietTheoDanhMuc")]
        public IHttpActionResult DanhSachBaiVietTheoDanhMuc(int idChuyenMuc)
        {
            var model = (from a in db.tbBaiViets
                         where a.ID_ChuyenMuc == idChuyenMuc
                         select new
                         {
                             id = a.ID_BaiViet,
                             hinhanh = a.HinhDaiDien1,
                             title = a.TieuDe,
                             ngaythang = a.NgayDang

                         }).AsEnumerable().Select(x => new ThongTinChung()
                         {
                             ID_BaiViet = x.id,
                             HinhDaiDien1 = x.hinhanh,
                             TieuDe = x.title,
                             NgayDang = x.ngaythang

                         });

            return Ok(model.ToList());
        }

        [HttpGet]
        [Route("DanhSachBaiViet_PhanTrang")]
        public IHttpActionResult ThongTinChung_PhanTrang(int soTrang , int soBV)
        {
            var pageIndex = (soTrang - 1) * soBV;
            var model = (from a in db.tbBaiViets
                         where a.ID_ChuyenMuc == 4
                         select new
                         {
                             id = a.ID_BaiViet,
                             hinhanh = a.HinhDaiDien1,
                             title = a.TieuDe,
                             ngaythang = a.NgayDang

                         }).AsEnumerable().Select(x => new ThongTinChung()
                         {
                             ID_BaiViet = x.id,
                             HinhDaiDien1 = x.hinhanh,
                             TieuDe = x.title,
                             NgayDang = x.ngaythang

                         }).Skip(pageIndex).Take(soBV);

            return Ok(model.ToList());
        }

        [HttpGet]
        [Route("ChiTietBaiViet")]
        public IHttpActionResult ChiTiet(int idBV)
        {
            var chitiet = db.tbBaiViets.Where(x => x.ID_BaiViet == idBV).FirstOrDefault();
            ThongTinChung tt = new ThongTinChung();
            tt.NoiDung = chitiet.NoiDung;
            tt.TieuDe = chitiet.TieuDe;
            tt.HinhDaiDien1 = chitiet.HinhDaiDien1;
            tt.HinhDaiDien2 = chitiet.HinhDaiDien2;
            tt.MoTa = chitiet.MoTa;
            tt.NgayDang = chitiet.NgayDang;
            tt.Nguoidang = chitiet.Nguoidang;
            return Ok(tt);
        }
    }
}
