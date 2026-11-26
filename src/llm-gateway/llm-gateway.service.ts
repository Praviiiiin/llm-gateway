import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ProviderSelectorService } from 'src/providers/provider-selector.service';
import { GroqService } from 'src/providers/groq.service';
import { LlmRequestsService } from 'src/llm-requests/llm-requests.service';
import { FinalRequestStatus } from '../llm-requests/dto/update-llm-request.dto';

@Injectable()
export class LlmGatewayService {
    constructor(
        private readonly providerSelector: ProviderSelectorService,
        private readonly groqService: GroqService,
        private readonly llmRequestsService: LlmRequestsService,
    ) {}

    async generate(prompt: string) {
        const provider = await this.providerSelector.selectProvider();

        if (provider.name !== 'groq') {
            throw new ServiceUnavailableException(
                `No adapter is configured for provider:${provider.name}`,
            );
        }

        const model = 'openai/gpt-oss-120b';

        const request = await this.llmRequestsService.createPendingRequest(
            model, 
            provider.id,
        );

        const startTime = Date.now();

        try{
            const result = await this.groqService.generateResponse(prompt);

            const latencyMs = Date.now() - startTime;

            await this.llmRequestsService.updateRequest(request.id, {
                status: FinalRequestStatus.SUCCESS,
                inputTokens: result.usage?.prompt_tokens ?? 0,
                outputTokens: result.usage?.completion_tokens ?? 0,
                latencyMs, 
            });

            return {
                requestId: request.id,
                provider: provider.name,
                ...result,
            };
            
        } catch(error) {
            const latencyMs = Date.now() - startTime;

            await this.llmRequestsService.updateRequest(request.id, {
                status: FinalRequestStatus.FAILED,
                latencyMs,
                errorCode: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
            });

            throw error;
        }
    }
}
