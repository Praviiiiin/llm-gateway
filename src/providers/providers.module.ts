import { Module } from '@nestjs/common';
import { GroqService } from './groq.service';
import { GroqController } from './groq.controller';
import { LlmRequestsModule } from 'src/llm-requests/llm-requests.module';
import { ProviderHealthService } from './provider-health.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProviderSelectorService } from './provider-selector.service';

@Module({
  imports: [LlmRequestsModule, PrismaModule],
  providers: [GroqService, ProviderHealthService, ProviderSelectorService],
  exports: [GroqService, ProviderHealthService, ProviderSelectorService],
  controllers: [GroqController],
})
export class ProvidersModule {}
