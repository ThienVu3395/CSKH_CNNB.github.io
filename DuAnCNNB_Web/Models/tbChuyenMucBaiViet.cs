//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DuAnCNNB_Web.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbChuyenMucBaiViet
    {
        public tbChuyenMucBaiViet()
        {
            this.tbBaiViets = new HashSet<tbBaiViet>();
        }
    
        public int ID_ChuyenMuc { get; set; }
        public string TenChuyenMuc { get; set; }
        public string MoTaChuyenMuc { get; set; }
        public string IconChuyenMuc { get; set; }
        public string GhiChu { get; set; }
        public Nullable<int> TrangThai { get; set; }
    
        public virtual ICollection<tbBaiViet> tbBaiViets { get; set; }
    }
}