using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
  public class Details
  {
    public class Query : IRequest<Result<ActivityDto>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<ActivityDto>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      private readonly IUserAccessor _userAccessor;

      public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
      {
        _context = context;
        _mapper = mapper;
        _userAccessor = userAccessor;
      }

      public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
      {
        // return await _context.ActivitiesTable.FindAsync(request.Id);
        var activity = await _context.ActivitiesTable
                      .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername()})
                      .FirstOrDefaultAsync(x => x.Id == request.Id);

        return Result<ActivityDto>.Success(activity);

        // Ovo rijesenj nije dobro u praksi zbog koristenja resursa Exception
        // Treba se izbjegavati
        //if (activity == null) throw new Exception("Nisam nista pronasao!");
        //return activity;
      }
    }
  }
}
