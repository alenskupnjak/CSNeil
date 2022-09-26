using Application.Core;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
  public class Delete
  {

    public class Command : IRequest<Result<Unit>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;

      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var activities = await _context.ActivitiesTable.FindAsync(request.Id);

        //if (activities == null) return null;

        _context.Remove(activities);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Nisam uspio obrisati zapis");

        //return Result<Unit>.Success(Unit.Value);
        return Result<Unit>.Success(Unit.Value);

        // doslovno vraca nista
        //return Unit.Value;
      }
    }

  }
}
