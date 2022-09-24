﻿using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<Result<List<ActivityDto>>> { }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
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

      public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        // var activities = await _context.ActivitiesTable
        //    .Include(a => a.Attendees)
        //    .ThenInclude(u => u.AppUser)
        //    .ToListAsync(cancellationToken);
        // var data = _mapper.Map<List<ActivityDto>>(activities);
        // return Result<List<ActivityDto>>.Success(data);

        var activities = await _context.ActivitiesTable
              .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
              .ToListAsync(cancellationToken);

        return Result<List<ActivityDto>>.Success(activities);
      }
    }
  }
}
