using Domain;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        // setiranje validatora middel whaere
        RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
      }
    }

    // HANDLER
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;

      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        _context.ActivitiesTable.Add(request.Activity);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return Result<Unit>.Failure("Nisam uspio kreirati zapis");

        return Result<Unit>.Success(Unit.Value);

        // doslovno vraca nista
        // return Unit.Value;
      }
    }
  }
}
