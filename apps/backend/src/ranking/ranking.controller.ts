import { Controller, Get, Query } from '@nestjs/common';
import type { GetRankingDTO } from 'src/types/dtos.js';
import { GetRankingQuery } from '../types/queries.js';
import { RankingService } from './ranking.service.js';

@Controller('/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  async getRanking(@Query() query: GetRankingQuery): Promise<GetRankingDTO> {
    return this.rankingService.getRanking(query);
  }
}
