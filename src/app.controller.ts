import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LlmRequest } from './generated/prisma/client';
import { LlmRequestsService } from './llm-requests/llm-requests.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly llmRequestsService: LlmRequestsService,
  ) {}

  @Get('health/database')
  checkDatabase() {
    return this.appService.checkDatabase();
  }

  @Post('llm-requests')
  createRequest(@Body() body: { model: string }) {
    return this.llmRequestsService.createPendingRequest(body.model);
  }
}
