import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import type { GetRankingDTO } from 'src/types/dtos.js';
import { RankingService } from './ranking.service.js';

@Controller('/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  async getRanking(): Promise<GetRankingDTO> {
    return this.rankingService.getRanking();
  }
}
