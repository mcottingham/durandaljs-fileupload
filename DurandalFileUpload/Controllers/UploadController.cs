using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Drawing;
using System.Configuration;
using DurandalFileUpload.Models;

namespace DurandalFileUpload.Controllers {
    public class UploadController : ApiController {
        private FilesDbContext _context;
        private string _storageEndpoint;

        public UploadController() {
            _context = new FilesDbContext();
        }

        [HttpPost]
        public async Task<HttpResponseMessage> FileUpload(string type) {
            try {
                if (!Request.Content.IsMimeMultipartContent("form-data")) {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.UnsupportedMediaType));
                }

                var provider = new MultipartMemoryStreamProvider();

                var t = await Request.Content.ReadAsMultipartAsync(provider);

                var item = t.Contents.FirstOrDefault();

                if (item != null) {
                    var stream = await item.ReadAsStreamAsync();

                    //Your save file logic goes here.
                    return Request.CreateResponse(HttpStatusCode.OK, item.Headers.ContentDisposition.FileName);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new ArgumentException("A file must be posted to this action method", ""));
            }
            catch (Exception ex) {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError));
            }
        }

    }
}
