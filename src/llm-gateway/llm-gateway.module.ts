import { Module } from '@nestjs/common';
import { LlmGatewayService } from './llm-gateway.service';
import { LlmGatewayController } from './llm-gateway.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { LlmRequestsModule } from 'src/llm-requests/llm-requests.module';

@Module({
  imports: [ProvidersModule, LlmRequestsModule],
  providers: [LlmGatewayService],
  controllers: [LlmGatewayController]
})
export class LlmGatewayModule {}
