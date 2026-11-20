import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LlmRequestsService } from './llm-requests/llm-requests.service';
import { CreateLlmRequestDto } from './llm-requests/llm-request.dto';

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
  createRequest(@Body() body: CreateLlmRequestDto) {
    return this.llmRequestsService.createPendingRequest(body.model);
  }
}
