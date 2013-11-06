using DurandalFileUpload.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Breeze.WebApi2;
using Breeze.ContextProvider.EF6;
using Breeze.ContextProvider;
using Newtonsoft.Json.Linq;

namespace DurandalFileUpload.Controllers {
    [BreezeController]
    public class DbController: ApiController {
        private EFContextProvider<FilesDbContext> _context;

        public DbController() {
            _context = new EFContextProvider<FilesDbContext>();
        }

        [HttpGet]
        public string MetaData() {
            return _context.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle) {
            return _context.SaveChanges(saveBundle);
        }

        [HttpGet]
        public IQueryable<File> Files() {
            return _context.Context.Files;
        }
    }
}