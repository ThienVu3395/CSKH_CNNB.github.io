﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DatabaseCSKHEntities1 : DbContext
    {
        public DatabaseCSKHEntities1()
            : base("name=DatabaseCSKHEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Baochisonuoc> Baochisonuocs { get; set; }
        public DbSet<Giaytocanthiet> Giaytocanthiets { get; set; }
        public DbSet<MUCLUCYEUCAUNANGDOI> MUCLUCYEUCAUNANGDOIs { get; set; }
        public DbSet<tbDiemthutien> tbDiemthutiens { get; set; }
        public DbSet<tbDieuchinh> tbDieuchinhs { get; set; }
        public DbSet<tbDot> tbDots { get; set; }
        public DbSet<tbDuong> tbDuongs { get; set; }
        public DbSet<tbGanmoi> tbGanmois { get; set; }
        public DbSet<tbHokhau> tbHokhaus { get; set; }
        public DbSet<tbLichcup> tbLichcups { get; set; }
        public DbSet<tbMadanhbo> tbMadanhboes { get; set; }
        public DbSet<tbPhuong> tbPhuongs { get; set; }
        public DbSet<tbQuan> tbQuans { get; set; }
        public DbSet<tbTiennuoc> tbTiennuocs { get; set; }
        public DbSet<tbXulychitiet> tbXulychitiets { get; set; }
        public DbSet<tbXulyyeucau> tbXulyyeucaus { get; set; }
        public DbSet<LoaiFrom_GiayTo> LoaiFrom_GiayTo { get; set; }
        public DbSet<tbBaiViet> tbBaiViets { get; set; }
        public DbSet<tbChuyenMucBaiViet> tbChuyenMucBaiViets { get; set; }
        public DbSet<tbHoidap> tbHoidaps { get; set; }
        public DbSet<tbLoaiQuitrinh> tbLoaiQuitrinhs { get; set; }
    }
}
