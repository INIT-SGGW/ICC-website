import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  @ApiOperation({
    summary: 'Get status',
    description: 'If you get reponse, api is alive',
    tags: ['status'],
  })
  @ApiResponse({ status: 200, description: 'Returns status of api' })
  getStatus(): { status: string } {
    return this.appService.getStatus();
  }
}
