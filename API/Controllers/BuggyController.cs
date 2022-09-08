using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [AllowAnonymous]
  public class BuggyController : BaseApiController
  {
    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
      return NotFound("Nisam nista naso 012");
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
      return BadRequest("Ovo je BAD request 010");
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
      throw new Exception("023 This is a server error  poslano sa backenda - BuggyController");
    }

    [HttpGet("unauthorised")]
    public ActionResult GetUnauthorised()
    {
      return Unauthorized("Ti nemas pristup ! 013");
    }
  }
}