using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DurandalFileUpload.Models {
    public class File {
        public int Id { get; set; }
        public string Filename { get; set; }
        public string DisplayName { get; set; }
    }
}