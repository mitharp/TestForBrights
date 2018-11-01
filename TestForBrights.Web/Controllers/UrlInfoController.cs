using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TestForBrights.Web.Models;

namespace TestForBrights.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlInfoController : Controller
    {
        private readonly UrlDbContext dbContext;

        public UrlInfoController(UrlDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("[action]")]
        public UrlInfoData GetUrlInfoData([FromQuery] string url) => new UrlManager(dbContext).GetUrlInfoData(url);

        [HttpGet("[action]")]
        public IEnumerable<UrlInfoData> GetAllUrlInfoData() =>
            new UrlManager(dbContext).GetAllUrlInfoData();

        [HttpGet("[action]")]
        public IEnumerable<object> GetPlotInfoByUrl([FromQuery] string url) =>
            new UrlManager(dbContext).GetPlotInfoByUrl(new UriBuilder(url).Uri.ToString());
    }
}
