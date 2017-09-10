using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using AngularVsJS.Models;
using AngularVsJS.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Newtonsoft.Json;

namespace AngularVsJS.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PositionsController : Controller
    {
        private readonly DevelopHelperDbContext _context;

        public PositionsController(DevelopHelperDbContext context)
        {
            _context = context;
            if (_context.Positions.Count() == 0)
            {
                 _firstInitialise();
            }
        }

        private async void _firstInitialise()
        {
            Array statusiesArray = Enum.GetValues(typeof(PositionStatus));
            Array typiesArray = Enum.GetValues(typeof(PositionType));
            var today =DateTime.Today;
            var random = new Random();
            for (int i = 1; i < 21; i++)
            {
                var position = new Position()
                {
                    Name = "Position " + i,
                    Description = "Daescription "+ i,
                    Date = new DateTime(today.Year, today.Month, today.Day + i),
                    Status = (PositionStatus)statusiesArray.GetValue(random.Next(statusiesArray.Length)),
                    Type = (PositionType)typiesArray.GetValue(random.Next(typiesArray.Length))
                };
                await _context.AddAsync(position);
            }
            await _context.SaveChangesAsync();
        }

        [HttpGet]
        public async Task<IEnumerable<Position>> AllPositionsTask()
        {
            var positions = await _context.Positions.ToListAsync();
            return positions;
            
        }

        [HttpGet("{id}")]
        public async Task<Position> GetPositionsTask(string id)
        {
            var intId = 0;
            Int32.TryParse(id,out intId);
            var position = await _context.Positions.FirstOrDefaultAsync(t => t.Id == intId);
            return position;

        }

        [HttpPut]
        public async Task<JsonResult> SavePosition([FromBody] Position data)
        {
            if (data != null)
            {
                _context.Update(data);
                await _context.SaveChangesAsync();
            }

            return Json(JsonConvert.SerializeObject(data));
        }

        //Add a new item
        [HttpPost]
        public async Task<JsonResult> CreatePositionTask([FromBody] Position data)
        {
            if (data != null)
            {
                await _context.AddAsync(data);
                await _context.SaveChangesAsync();
            }

            return Json(JsonConvert.SerializeObject(data));
        }

        [HttpPost]
        public async Task<JsonResult> DeletePositionTask([FromBody] Position data)
        {
            if (data != null)
            {
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }

            return Json("ok");
        }
    }
}
