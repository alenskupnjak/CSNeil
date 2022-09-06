using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
  // ovime sam omogucio da svako ima pristup
  // [AllowAnonymous]
  public class ActivitiesTableController : BaseApiController
  {



    [HttpGet]
    // ime na kraju  GetActivities moze biti bilo kakvo, nema utjecaja
    public async Task<IActionResult> GetActivities()
    {
      return HandleResult(await MediatorServis.Send(new List.Query()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivitiy(Guid id)
    {
      var result = await MediatorServis.Send(new Details.Query { Id = id });
      return HandleResult(result);
    }


    [HttpPost]
    public async Task<IActionResult> CreateActivitiy([FromBody] Activity activity)
    {
      return HandleResult(await MediatorServis.Send(new Create.Command { Activity = activity }));
    }

    [Authorize(Policy = "IsActivityHost")]
    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
      activity.Id = id;
      return HandleResult(await MediatorServis.Send(new Edit.Command { Activity = activity }));
    }

    // [Authorize(Policy = "IsActivityHost")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
      return HandleResult(await MediatorServis.Send(new Delete.Command { Id = id }));
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(Guid id)
    {
      return HandleResult(await MediatorServis.Send(new UpdateAttendance.Command { Id = id }));
    }


  }
}
