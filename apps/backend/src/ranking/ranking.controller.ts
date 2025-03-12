import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import type { GetRankingDTO } from 'src/types/dtos.js';
import { Request as Req } from 'express';
import { GetRankingQuery } from '../types/queries.js';
import { SoftUserAuthGuard } from '../guards/user.guard.js';
import { RankingService } from './ranking.service.js';

@Controller('/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @UseGuards(SoftUserAuthGuard)
  async getRanking(@Query() query: GetRankingQuery, @Request() request: Req): Promise<GetRankingDTO> {
    return this.rankingService.getRanking(query, request);
  }
}
