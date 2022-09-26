using API.Extensions;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BaseApiController : ControllerBase
  {
    private IMediator _mediator;

    protected IMediator MediatorServis => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();


    // Kroz ovo prolazi svaki endpoint
    protected ActionResult HandleResult<T>(Result<T> result)
    {
      if (result == null) return NotFound();

      // Pronaso rezultat vracam vrijednost
      if (result.IsSuccess && result.Value != null)
        return Ok(result.Value);

      // Nisam naso
      if (result.IsSuccess && result.Value == null)
        return NotFound();

      return BadRequest(result.Value);
    }


    protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
    {
      if (result == null) return NotFound();
      if (result.IsSuccess && result.Value != null)
      {
        // bitan je redosljijed varijabli prilikom pozivanja
        Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize,
            result.Value.TotalCount, result.Value.TotalPages);
        return Ok(result.Value);
      }
      if (result.IsSuccess && result.Value == null)
        return NotFound();
      return BadRequest(result.Error);
    }

  }
}
