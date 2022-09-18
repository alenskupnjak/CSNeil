using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
  public class Create
  {
    /// <summary>
    /// 
    /// </summary>
    public class Command : IRequest<Result<CommentDto>>
    {
      public string Body { get; set; }
      public Guid ActivityId { get; set; }
    }
    /// <summary>
    /// 
    /// </summary>
    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      { // constructor
        RuleFor(x => x.Body).NotEmpty();
      }
    }

    /// <summary>
    /// 
    /// </summary>
    public class Handler : IRequestHandler<Command, Result<CommentDto>>
    {
      private readonly IUserAccessor _userAccessor;  // varijabla
      private readonly DataContext _context;  // varijabla
      private readonly IMapper _mapper;   // varijabla
      public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
      {   // constructor
        _mapper = mapper;
        _context = context;
        _userAccessor = userAccessor;
      }

      public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
      { // LOGIKA
        var activity = await _context.ActivitiesTable.FindAsync(request.ActivityId);

        if (activity == null) return null;

        var user = await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

        var comment = new Comment
        {
          Author = user,   // set podataka
          Activity = activity,  // set podataka
          Body = request.Body
        };

        activity.Comments.Add(comment); // na postojeci zapis koji si naso u bazi dodaj podatak

        var success = await _context.SaveChangesAsync() > 0;  // snimanje u bazu

        if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));

        return Result<CommentDto>.Failure("Failed to dodati comment");
      }
    }
  }
}