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
    
    public partial class tbXulychitiet
    {
        public int ID { get; set; }
        public int IDXULY { get; set; }
        public Nullable<System.DateTime> NGAYXULY { get; set; }
        public string NVXULY { get; set; }
        public string NOIDUNGXL1 { get; set; }
        public string NOIDUNGXL2 { get; set; }
        public string NOIDUNGXL3 { get; set; }
        public string NOIDUNGXL4 { get; set; }
        public string NOIDUNGXL5 { get; set; }
        public Nullable<int> IDQUITRINH { get; set; }
        public Nullable<int> TTXULY { get; set; }
        public Nullable<int> TIENDO { get; set; }
        public string GHICHU { get; set; }
    
        public virtual tbXulyyeucau tbXulyyeucau { get; set; }
    }
}
