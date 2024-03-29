﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
  public class List
  {
    public class Query : IRequest<Result<List<CommentDto>>>  // lista rezultata
    {
      public Guid ActivityId { get; set; }
    }

    // IRequestHandler<Proslijedi varijablu- Query, RETURN vrijednost Result<List<CommentDto>>>
    public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)  //interface
      {
        var comments = await _context.Comments
            .Where(x => x.Activity.Id == request.ActivityId)
            .OrderByDescending(x => x.CreatedAt)
            .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return Result<List<CommentDto>>.Success(comments);
      }
    }
  }
}