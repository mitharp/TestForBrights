using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using TestForBrights.Web.Models;

namespace TestForBrights.Web
{
    public class UrlManager
    {
        private readonly UrlDbContext dbContext;

        public UrlManager(UrlDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public UrlInfoData GetUrlInfoData(string url)
        {
            var uri = new UriBuilder(url).Uri;

            var data = new UrlInfoData
            {
                RequestDate = DateTime.Now,
                Status = string.Empty,
                Title = string.Empty,
                Url = uri.ToString()
            };

            if (string.IsNullOrWhiteSpace(url))
                return data;

            try
            {

                using (var client = new HttpClient())
                {
                    var response = client.GetAsync(uri).GetAwaiter().GetResult();

                    data.Status = $"{(int)response.StatusCode} – {response.StatusCode.ToString()}";

                    var page = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    var start = page.IndexOf("<title>", StringComparison.Ordinal) + 7;
                    var end = page.IndexOf("</title>", StringComparison.Ordinal);
                    data.Title = start >= 7 && end > start ? page.Substring(start, end - start) : string.Empty;
                }

                dbContext.UrlInfoData.Add(data);
                dbContext.SaveChanges();

                return data;
            }
            catch (Exception e)
            {
                if (string.IsNullOrWhiteSpace(data.Status))
                    data.Status = "Failed";
                dbContext.UrlInfoData.Add(data);
                dbContext.SaveChanges();
                return data;
            }
        }

        public IEnumerable<UrlInfoData> GetAllUrlInfoData() =>
            dbContext.UrlInfoData.GroupBy(u => u.Url)
                .Select(g => g.OrderBy(u => u.RequestDate).LastOrDefault())
                .Select(u => u).ToList();

        public IEnumerable<object> GetPlotInfoByUrl(string url)
        {
            var dates = dbContext.UrlInfoData.Where(u => u.Url == url)
                .Select(u => u.RequestDate.Date).Distinct().OrderBy(d => d).ToList();

            return dbContext.UrlInfoData.Where(u => u.Url == url)
                .GroupBy(u => u.Status)
                .Select(g => new
                {
                    Status = g.FirstOrDefault().Status,
                    DateList = dates.Select(d => new
                    {
                        Date = d.ToString("dd.MM.yyyy"),
                        Count = g.Count(u => u.RequestDate.Date == d)
                    })
                }).ToList();
        }
    }
}
