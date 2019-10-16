using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DuAnCNNB_Web.Models
{
    public class ThongTinChung
    {
        public int ID_BaiViet { get; set; }
        public Nullable<int> ID_ChuyenMuc { get; set; }
        public string TieuDe { get; set; }
        public string MoTa { get; set; }
        public string HinhDaiDien1 { get; set; }
        public string HinhDaiDien2 { get; set; }
        public string NoiDung { get; set; }
        public string Video { get; set; }
        public Nullable<System.DateTime> NgayDang { get; set; }
        public Nullable<int> TrangThai { get; set; }
        public Nullable<int> TinNoiBat { get; set; }
        public Nullable<int> TinHot { get; set; }
        public string Nguoidang { get; set; }
        public string Nguoiduyet { get; set; }
        public Nullable<System.DateTime> Ngayduyet { get; set; }
        public string Ghichu { get; set; }
    }
}