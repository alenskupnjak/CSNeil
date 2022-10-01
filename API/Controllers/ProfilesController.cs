using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

  /// <summary>
  /// /profiles/{username}
  /// </summary>
  public class ProfilesController : BaseApiController
  {
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
      return HandleResult(await MediatorServis.Send(new Details.Query { Username = username }));
    }

    [HttpPut]
    public async Task<IActionResult> Edit(Edit.Command command)
    {
      return HandleResult(await MediatorServis.Send(command));
    }

    [HttpGet("{username}/aktivnosti")]
    public async Task<IActionResult> GetUserActivities(string username, string predicate)
    {
      return HandleResult(await MediatorServis.Send(new ListActivities.Query
      { Username = username, Predicate = predicate }));
    }
  }
}