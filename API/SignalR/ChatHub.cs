using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
  public class ChatHub : Hub
  {
    private readonly IMediator _mediator;
    /// <summary>
    /// 
    /// </summary>
    /// <param name="mediator"></param>
    public ChatHub(IMediator mediator)
    { // constructor
      _mediator = mediator;
    }

    /// <summary>
    /// Slanje komentara
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    public async Task SendComment(Create.Command command)
    {
      var comment = await _mediator.Send(command);
      await Clients.Group(command.ActivityId.ToString())
          .SendAsync("ReceiveComment", comment.Value);
    }
    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    public override async Task OnConnectedAsync()
    {
      var httpContext = Context.GetHttpContext();
      var activityId = httpContext.Request.Query["activityId"];
      await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
      var result = await _mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });
      await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
  }
}