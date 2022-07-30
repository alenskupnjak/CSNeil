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

    }
}
