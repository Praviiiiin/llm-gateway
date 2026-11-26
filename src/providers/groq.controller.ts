import { Body, Controller, Post } from '@nestjs/common';
import { GroqService } from './groq.service';
import { generateResponseDto } from '../llm-requests/dto/generate-response.dto';
import { LlmRequestsService } from '../llm-requests/llm-requests.service';
import { FinalRequestStatus } from 'src/llm-requests/dto/update-llm-request.dto';
import { ProviderHealthService } from './provider-health.service';

@Controller('providers/groq')
export class GroqController {
  constructor(
    private readonly groqService: GroqService,
    private readonly llmRequestsService: LlmRequestsService,
    private readonly providerHealthService: ProviderHealthService,
  ) {}

  @Post('generate')
  async generate(@Body() body: generateResponseDto) {
    const model = 'openai/gpt-oss-120b';

    const request = await this.llmRequestsService.createPendingRequest(
      model,
      'groq-provider-001'
    );

    const startTime = Date.now();

    try {
      const result = await this.groqService.generateResponse(body.prompt);

      const latencyMs = Date.now() - startTime;

      await this.llmRequestsService.updateRequest(request.id, {
        status: FinalRequestStatus.SUCCESS,
        inputTokens: result.usage?.prompt_tokens ?? 0,
        outputTokens: result.usage?.completion_tokens ?? 0,
        latencyMs,
      });

      return {
        requestId: request.id,
        ...result,
      };
    } catch (error) {
      const latencyMs = Date.now() - startTime;

      await this.llmRequestsService.updateRequest(request.id, {
        status: FinalRequestStatus.FAILED,
        latencyMs,
        errorCode: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
      });

      throw error;
    }
  }

  @Post('health-check')
  checkHealth() {
    return this.providerHealthService.checkGroqHealth();
  }
}