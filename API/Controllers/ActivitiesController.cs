using Application.Activities;
using Domain;
using MediatR;
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
        private readonly IMediator _mediator;

        // 01 private readonly DataContext _context;

        // 01 public ActivitiesTableController(DataContext context)
        public ActivitiesTableController(IMediator mediator)
        {
            _mediator = mediator;
            //  01 _context = context;
        }
  
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {

            // 01 return await _context.ActivitiesTable.ToListAsync();

            return await _mediator.Send(new List.Query());

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivitiy(Guid id)
        {

           // 01 return await _context.ActivitiesTable.FindAsync(id);
            return Ok();

        }
    }
}
