using System;
using System.ComponentModel.DataAnnotations;

namespace TestForBrights.Web.Models
{
    public class UrlInfoData
    {
        [Key]
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime RequestDate { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
    }
}
