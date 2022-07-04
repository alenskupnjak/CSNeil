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
    // 06 public class ActivitiesTableController : ControllerBase
    public class ActivitiesTableController : BaseApiController
    {
       
        // 06  private readonly IMediator _mediator;

        // 06 // 01 private readonly DataContext _context;

        // 06  // 01 public ActivitiesTableController(DataContext context)
        // 06 public ActivitiesTableController(IMediator mediator)
        // 06  {
        // 06    _mediator = mediator;
        //    //  01 _context = context;
        // 06 }
  
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {

           // 01 return await _context.ActivitiesTable.ToListAsync();

           // 06 return await _mediator.Send(new List.Query());

            return await MediatorServis.Send(new List.Query());

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivitiy(Guid id)
        {

           // 01 return await _context.ActivitiesTable.FindAsync(id);
            return Ok();

        }
    }
}
