using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DuAnCNNB_Web.Models;
using System.IO;

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
                             mota = a.MoTa,
                             ngaythang = a.NgayDang

                         }).AsEnumerable().Select(x => new ThongTinChung()
                         {
                             ID_BaiViet = x.id,
                             HinhDaiDien1 = x.hinhanh,
                             TieuDe = x.title,
                             MoTa = x.mota,
                             NgayDang = x.ngaythang
                         });

            return Ok(model.ToList());
        }

        [HttpGet]
        [Route("DanhSachBaiViet_PhanTrang")]
        public IHttpActionResult ThongTinChung_PhanTrang(int idDanhMuc, int soTrang, int soBV)
        {
            var pageIndex = (soTrang - 1) * soBV;
            var model = (from a in db.tbBaiViets
                         where a.ID_ChuyenMuc == idDanhMuc
                         select new
                         {
                             id = a.ID_BaiViet,
                             hinhanh = a.HinhDaiDien1,
                             title = a.TieuDe,
                             mota = a.MoTa,
                             ngaythang = a.NgayDang

                         }).AsEnumerable().Select(x => new ThongTinChung()
                         {
                             ID_BaiViet = x.id,
                             HinhDaiDien1 = x.hinhanh,
                             TieuDe = x.title,
                             MoTa = x.mota,
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

        [HttpPost]
        [Route("UploadFiles")]
        public string UploadFiles()
        {
            int iUploadedCnt = 0;
            string sPath = "";
            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/UploadTemp/");
            string date = DateTime.Now.Year.ToString();
            sPath = Path.Combine(sPath, date);
            if (!Directory.Exists(sPath))
            {
                Directory.CreateDirectory(sPath);
            }
            date = DateTime.Now.Month.ToString();
            sPath = Path.Combine(sPath, date);
            if (!Directory.Exists(sPath))
            {
                Directory.CreateDirectory(sPath);
            }
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];
                if (hpf.ContentLength > 0)
                {
                    if (!File.Exists(sPath + Path.GetFileName(hpf.FileName)))
                    {
                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));
                        iUploadedCnt = iUploadedCnt + 1;
                    }

                    else
                    {
                        FileInfo f = new FileInfo(sPath + Path.GetFileName(hpf.FileName));
                        f.Delete();
                        hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));
                        iUploadedCnt = iUploadedCnt + 1;
                    }
                }
            }

            if (iUploadedCnt > 0)
            {
                return iUploadedCnt + " Files Uploaded Successfully";
            }

            else
            {
                return "Upload Failed";
            }
        }
    }
}
