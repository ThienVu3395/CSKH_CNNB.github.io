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
    
    public partial class tbXulyyeucau
    {
        public tbXulyyeucau()
        {
            this.tbXulychitiets = new HashSet<tbXulychitiet>();
        }
    
        public int ID { get; set; }
        public int LOAIYC { get; set; }
        public int MAYC { get; set; }
        public string LOAIQT { get; set; }
        public string NVTIEPNHAN { get; set; }
        public Nullable<System.DateTime> NGAYNHAN { get; set; }
        public Nullable<int> TRANGTHAI { get; set; }
        public Nullable<int> XULY { get; set; }
        public string GHICHU { get; set; }
    
        public virtual ICollection<tbXulychitiet> tbXulychitiets { get; set; }
        public virtual tbLoaiQuitrinh tbLoaiQuitrinh { get; set; }
    }
}
