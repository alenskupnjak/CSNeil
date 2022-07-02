using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesTableController : ControllerBase
    {
        private readonly DataContext _context;

        public ActivitiesTableController(DataContext context)
        {
            _context = context;
        }
  
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {

            return await _context.ActivitiesTable.ToListAsync();

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivitiy(Guid id)
        {

            return await _context.ActivitiesTable.FindAsync(id);

        }
    }
}
