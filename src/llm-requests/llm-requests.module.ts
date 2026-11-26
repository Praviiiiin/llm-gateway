import { Module } from '@nestjs/common';
import { LlmRequestsService } from './llm-requests.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LlmRequestsService],
  exports: [LlmRequestsService],
})
export class LlmRequestsModule {}
