import { Body, Controller, Post } from '@nestjs/common';
import { LlmGatewayService } from './llm-gateway.service';
import { generateResponseDto } from '../llm-requests/dto/generate-response.dto';

@Controller('llm')
export class LlmGatewayController {
  constructor(
    private readonly llmGatewayService: LlmGatewayService,
  ) {}

  @Post('chat')
  generate(@Body() body: generateResponseDto) {
    return this.llmGatewayService.generate(body.prompt);
  }
}