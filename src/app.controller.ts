import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { LlmRequestsService } from './llm-requests/llm-requests.service';
import { CreateLlmRequestDto } from './llm-requests/dto/llm-request.dto';
import { UpdateLlmRequestDto } from './llm-requests/dto/update-llm-request.dto';

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

  @Patch('llm-requests/:id')
  updateRequest(
    @Param('id') id: string,
    @Body() body: UpdateLlmRequestDto,
  ) {
    return this.llmRequestsService.updateRequest(id, body);
  }

  @Get('llm-requests/:id')
  getRequest(@Param('id') id: string) {
    return this.llmRequestsService.getRequestById(id);
  }

  
}
