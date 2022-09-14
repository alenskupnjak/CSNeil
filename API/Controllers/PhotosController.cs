using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class PhotosController : BaseApiController
  {
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] Add.Command command)
    {
      return HandleResult(await MediatorServis.Send(command));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
      return HandleResult(await MediatorServis.Send(new Delete.Command { Id = id }));
    }


    // Postavljanje glavne slike
    [HttpPost("{id}/setMain")]
    public async Task<IActionResult> SetMain(string id)
    {
      return HandleResult(await MediatorServis.Send(new SetMain.Command { Id = id }));
    }
  }
}